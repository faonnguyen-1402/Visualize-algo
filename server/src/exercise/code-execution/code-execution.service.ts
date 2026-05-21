import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface CompilerResponse {
  status: string;
  stdout: string | null;
  stderr: string | null;
  exitCode: string | null;
  // Thêm các trường khác nếu cần
}

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);

  constructor(private readonly httpService: HttpService) {}

  async runCode(
    language: string,
    sourceCode: string,
    stdin: string,
  ): Promise<CompilerResponse> {
    const url = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run';
    console.log(
      'DEBUG: RAPIDAPI_KEY đang có giá trị là:',
      process.env.RAPIDAPI_KEY,
    );
    const apiKey = process.env.RAPIDAPI_KEY;

    // Kiểm tra xem API Key đã được cấu hình chưa
    if (!apiKey) {
      this.logger.error('RAPIDAPI_KEY is not defined in environment variables');
      throw new InternalServerErrorException('Server configuration error');
    }

    const data = {
      language: language,
      stdin: stdin,
      files: [{ name: `index.${language}`, content: sourceCode }],
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<CompilerResponse>(url, data, {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
          timeout: 20000, // Thêm timeout 10s để tránh treo server
        }),
      );
      console.log(
        'DEBUG: Phản hồi từ OneCompiler:',
        JSON.stringify(response.data),
      );
      const cleanStdout = response.data.stdout
        ? response.data.stdout.trim()
        : '';
      // return response.data;
      return {
        ...response.data,
        stdout: cleanStdout,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        this.logger.error(
          `API Error: ${JSON.stringify(axiosError.response.data)}`,
        );
      } else {
        this.logger.error(`Execution failed: ${axiosError.message}`);
      }

      throw new InternalServerErrorException(
        axiosError.response?.data ||
          'Failed to execute code on compiler engine',
      );
    }
  }
}
