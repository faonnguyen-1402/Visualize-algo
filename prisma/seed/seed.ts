import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sorting = await prisma.algorithmCategory.create({
    data: {
      name: 'Sorting',
      description: 'Các thuật toán sắp xếp',
    },
  });

  await prisma.algorithm.create({
    data: {
      title: 'Bubble Sort',
      slug: 'bubble-sort',
      description:
        'Bubble Sort là thuật toán sắp xếp đơn giản. Nó so sánh hai phần tử liền kề và đổi chỗ nếu sai thứ tự.',
      pseudoCode: `for i from 0 to n - 1:
  for j from 0 to n - i - 2:
    if arr[j] > arr[j + 1]:
      swap(arr[j], arr[j + 1])`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      difficulty: 'EASY',
      categoryId: sorting.id,
      exercises: {
        create: [
          {
            title: 'Implement Bubble Sort',
            description: 'Viết hàm sắp xếp mảng số nguyên bằng Bubble Sort.',
            difficulty: 'EASY',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed successfully');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
