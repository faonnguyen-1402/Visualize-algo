import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Định nghĩa resources cho các ngôn ngữ
const resources = {
  en: {
    translation: {
      nav: { home: "Home", algo: "Algorithms", practice: "Practice", login: "Login", signOut: "Sign out", profile: "Profile" },
      hero: {
        tag: "VISUALIZE ALGORITHM PLATFORM",
        title: "Learn Algorithms",
        highlight: " Visually",
        desc: "VizAlgo is a web platform that helps students understand algorithms through interactive visualizations, coding practice, and real-time execution."
      },
      about: {
        title: "About VizAlgo",
        card1: { title: "Interactive Learning", desc: "Visualize how algorithms work step-by-step instead of only reading theory." },
        card2: { title: "Practice Coding", desc: "Solve coding exercises directly in the browser with multiple programming languages." },
        card3: { title: "Real-time Execution", desc: "Run code instantly and view outputs, runtime, memory, and testcase results." },
        card4: { title: "Modern UI", desc: "Clean dark-mode interface inspired by professional coding platforms." }
      },
      algo: {
        title: "Algorithms Categories",
        sorting: { title: "Sorting Algorithms", desc: "Sorting algorithms arrange data in a specific order such as ascending or descending." },
        searching: { title: "Searching Algorithms", desc: "Searching algorithms help locate data inside arrays or collections efficiently." }
      },
      team: {
        title: "Development Team",
        desc: "We are third-year Information Technology students at Tay Nguyen University."
      },
      home: {
        hero: { title: "Learn Algorithms", highlight: "Visually", desc: "Understand how algorithms work with step-by-step visualizations." },
        sorting: { title: "Sorting Algorithms", desc: "Sorting algorithms are used to organize data in a specific order..." },
        searching: { title: "Searching Algorithms", desc: "Search algorithms are used to determine the location of an element..." },
        card_action: "Learn"
      },
      practice: {
        title: "Practice Algorithms",
        filters: {
          all_algo: "All Algorithms", sorting: "Sorting", searching: "Searching",
          all_diff: "All Difficulty", easy: "Easy", medium: "Medium", hard: "Hard"
        },
        algo_label: "Algorithm",
        diff_label: "Difficulty",
        start_btn: "Start Practice"
      },
      difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
      exercise: {
        description: "Description",
        constraints: "Constraints",
        example: "Example 1",
        run_btn: "Run",
        submit_btn: "Submit",
        case: "Case",
        result_title: "Test Result",
        running: "Running Testcases...",
        passed: "Passed: {{passed}} / {{total}} testcases",
        runtime: "Runtime",
        memory: "Memory",
        language: "Language",
        wrong_answer: "Wrong Answer Details",
        input: "Input",
        expected: "Expected",
        your_output: "Your Output",
        history: "Submission History"
      },
      category: { sorting: "SORTING", searching: "SEARCHING" },
      profile: {
        title: "Profile",
        edit: "Edit Profile",
        total: "Total Exercises Completed",
        tabs: { easy: "Easy", medium: "Medium", hard: "Hard" },
        stats: { heatmap: "Activity (365 days)", progress: "Overall Progress", completed: "Completed Exercises", left: "Left", completedpc: "Completed assignments", join_year: "Join year" },
        exercises: "Exercises",
        no_exercises: "There are no exercises at this level yet!",
        exercise_count: "{{count}} exercises",
        modal: {
          edit_title: "Edit Profile",
          avatar: "Avatar",
          placeholder_no_photo: "No photo selected",
          select_photo: "Select photo",
          name: "Name",
          name_placeholder: "Type your name here ...",
          cancel: "Cancel",
          save: "Save"
        }
      },

    }
  },
  vi: {
    translation: {
      nav: { home: "Trang chủ", algo: "Thuật toán", practice: "Luyện tập", login: "Đăng nhập", signOut: "Đăng xuất", profile: "Hồ sơ cá nhân" },
      hero: {
        tag: "NỀN TẢNG TRỰC QUAN HÓA THUẬT TOÁN",
        title: "Học thuật toán",
        highlight: " Trực quan",
        desc: "VizAlgo là một nền tảng web giúp sinh viên hiểu các thuật toán thông qua hình ảnh trực quan, thực hành lập trình và thực thi thời gian thực."
      },
      about: {
        title: "Về VizAlgo",
        card1: { title: "Học tập tương tác", desc: "Trực quan hóa cách thuật toán hoạt động từng bước thay vì chỉ đọc lý thuyết." },
        card2: { title: "Thực hành lập trình", desc: "Giải các bài tập lập trình trực tiếp trên trình duyệt với nhiều ngôn ngữ khác nhau." },
        card3: { title: "Thực thi thời gian thực", desc: "Chạy mã ngay lập tức và xem kết quả đầu ra, thời gian chạy, bộ nhớ và kết quả kiểm thử." },
        card4: { title: "Giao diện hiện đại", desc: "Giao diện tối (dark-mode) sạch sẽ lấy cảm hứng từ các nền tảng lập trình chuyên nghiệp." }
      },
      algo: {
        title: "Các danh mục thuật toán",
        sorting: { title: "Thuật toán sắp xếp", desc: "Thuật toán sắp xếp sắp xếp dữ liệu theo một thứ tự cụ thể như tăng dần hoặc giảm dần." },
        searching: { title: "Thuật toán tìm kiếm", desc: "Thuật toán tìm kiếm giúp xác định vị trí dữ liệu bên trong mảng hoặc tập hợp một cách hiệu quả." }
      },
      team: {
        title: "Nhóm phát triển",
        desc: "Chúng tôi là sinh viên năm ba ngành Công nghệ thông tin tại Trường Đại học Tây Nguyên."
      },
      home: {
        hero: { title: "Học thuật toán", highlight: "Trực quan", desc: "Hiểu cách các thuật toán hoạt động với các hình ảnh trực quan từng bước." },
        sorting: { title: "Thuật toán sắp xếp", desc: "Các thuật toán sắp xếp được sử dụng để tổ chức dữ liệu theo một thứ tự cụ thể..." },
        searching: { title: "Thuật toán tìm kiếm", desc: "Các thuật toán tìm kiếm được sử dụng để xác định vị trí của một phần tử trong tập dữ liệu..." },
        card_action: "Học ngay"
      },
      practice: {
        title: "Luyện tập thuật toán",
        filters: {
          all_algo: "Tất cả thuật toán", sorting: "Sắp xếp", searching: "Tìm kiếm",
          all_diff: "Mọi độ khó", easy: "Dễ", medium: "Trung bình", hard: "Khó"
        },
        algo_label: "Thuật toán",
        diff_label: "Độ khó",
        start_btn: "Bắt đầu luyện tập"
      },
      difficulty: { easy: "Dễ", medium: "Trung bình", hard: "Khó" },
      exercise: {
        description: "Mô tả",
        constraints: "Ràng buộc",
        example: "Ví dụ 1",
        run_btn: "Chạy",
        submit_btn: "Nộp bài",
        case: "Trường hợp",
        result_title: "Kết quả kiểm thử",
        running: "Đang chạy testcase...",
        passed: "Đã qua: {{passed}} / {{total}} testcase",
        runtime: "Thời gian",
        memory: "Bộ nhớ",
        language: "Ngôn ngữ",
        wrong_answer: "Chi tiết lỗi sai",
        input: "Đầu vào",
        expected: "Mong đợi",
        your_output: "Kết quả của bạn",
        history: "Lịch sử nộp bài"
      },
      category: { sorting: "SẮP XẾP", searching: "TÌM KIẾM" },
      profile: {
        title: "Hồ sơ cá nhân",
        edit: "Chỉnh sửa hồ sơ",
        total: "Tổng số bài tập đã hoàn thành",
        tabs: { easy: "Dễ", medium: "Trung bình", hard: "Khó" },
        stats: { heatmap: "Hoạt động (365 ngày)", progress: "Tiến độ tổng quát",
          completed: "Bài tập đã hoàn thành",
          left: "Còn lại",
          completedpc: "Bài tập đã hoàn thành",
          join_year: "Năm tham gia" 
        },
        exercises: "Bài tập",
        no_exercises: "Chưa có bài tập nào ở mức độ này!",
        exercise_count: "{{count}} bài tập",
        modal: {
          edit_title: "Chỉnh sửa hồ sơ",
          avatar: "Ảnh đại diện",
          placeholder_no_photo: "Chưa chọn ảnh",
          select_photo: "Chọn ảnh",
          name: "Tên",
          name_placeholder: "Nhập tên của bạn tại đây ...",
          cancel: "Hủy",
          save: "Lưu"
        }
      },

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en', // Lấy ngôn ngữ từ localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React đã tự bảo vệ khỏi XSS
    },
  });

export default i18n;