import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, ChevronDown, Sparkles, Mail } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'student' | 'teacher' | 'account'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'Tất cả câu hỏi' },
    { id: 'student', label: 'Dành cho Học sinh' },
    { id: 'teacher', label: 'Dành cho Giáo viên' },
    { id: 'account', label: 'Tài khoản & Hệ thống' },
  ];

  const faqs = [
    {
      category: 'student',
      question: 'LearningHub có thu phí sử dụng đối với học sinh không?',
      answer: 'Hoàn toàn không! Học sinh có thể đăng ký tài khoản và tự do luyện tập kho đề thi trắc nghiệm, nhận kết quả chấm điểm kèm lời giải AI miễn phí 100%.',
    },
    {
      category: 'student',
      question: 'Làm thế nào để tôi xem lại bài thi đã làm và giải thích câu sai?',
      answer: 'Sau khi hoàn thành bài thi hoặc truy cập trang "Lịch sử thi", bạn chỉ cần nhấn chọn đợt thi tương ứng để xem lại toàn bộ câu hỏi, đáp án bạn chọn, đáp án chuẩn và giải thích đáp án bằng AI.',
    },
    {
      category: 'teacher',
      question: 'Tính năng AI Question Generator hoạt động như thế nào?',
      answer: 'Giáo viên chỉ cần tải lên tệp văn bản bài giảng (PDF/DOCX) hoặc dán đoạn văn bản kiến thức. Thuật toán AI sẽ tự động phân tích và sinh ra các câu hỏi trắc nghiệm kèm đáp án và độ khó tương ứng.',
    },
    {
      category: 'teacher',
      question: 'Tôi có thể import ngân hàng câu hỏi sẵn có từ file Excel được không?',
      answer: 'Có! Hệ thống hỗ trợ tính năng Import từ Excel. Bạn chỉ cần tải mẫu file Excel từ hệ thống, điền câu hỏi & đáp án theo đúng định dạng rồi tải lên để tạo đề thi tức thì.',
    },
    {
      category: 'account',
      question: 'Tôi quên mật khẩu tài khoản thì phải làm sao?',
      answer: 'Tại màn hình Đăng nhập, bạn hãy nhấn vào liên kết "Quên mật khẩu", nhập Email đăng ký để nhận mã khôi phục mật khẩu mới trong thời gian ngắn.',
    },
    {
      category: 'account',
      question: 'Hệ thống có bảo mật thông tin cá nhân và kết quả bài thi không?',
      answer: 'LearningHub cam kết bảo mật tuyệt đối dữ liệu cá nhân của người dùng. Kết quả thi của bạn chỉ có bạn và giáo viên được phân quyền mới có thể truy cập.',
    },
    {
      category: 'student',
      question: 'Tôi có thể làm bài thi trên điện thoại di động được không?',
      answer: 'Được! Giao diện LearningHub được tối ưu tương thích hoàn hảo trên mọi thiết bị: Điện thoại, Tablet, Laptop mà không cần cài đặt thêm app.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER SECTION */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] shadow-sm">
          <HelpCircle size={18} className="text-amber-500" />
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-foreground)]">
            Trung tâm trợ giúp & Hỏi đáp
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-foreground)] tracking-tight max-w-3xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Giải Đáp Mọi Thắc Mắc Về <br />
          <span className="text-[var(--color-primary)]">LearningHub</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed">
          Tìm kiếm nhanh các thắc mắc thường gặp hoặc xem hướng dẫn sử dụng hệ thống bên dưới.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khóa thắc mắc (ví dụ: AI, Excel, mật khẩu...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] focus:border-[var(--color-primary)] outline-none font-bold text-sm text-[var(--color-foreground)] shadow-md transition-all"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-primary)] text-white shadow-md scale-105 border-2 border-teal-700'
                  : 'bg-[var(--color-surface)] text-[var(--color-foreground)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ACCORDION FAQ LIST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="clay-card p-8 text-center space-y-3">
            <HelpCircle size={40} className="text-[var(--color-muted)] mx-auto" />
            <h3 className="text-xl font-extrabold text-[var(--color-foreground)]">Không tìm thấy câu hỏi phù hợp</h3>
            <p className="text-sm text-[var(--color-muted)]">Hãy thử tìm với từ khóa khác hoặc gửi câu hỏi trực tiếp cho chúng tôi.</p>
          </div>
        ) : (
          filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="clay-card bg-[var(--color-surface)] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-extrabold text-base sm:text-lg text-[var(--color-foreground)] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={18} className="text-[var(--color-primary)] shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[var(--color-muted)] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base font-medium text-[var(--color-muted)] border-t border-[var(--color-border)] leading-relaxed animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* CONTACT QUICK PROMPT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card p-8 bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-amber-500/10 border-2 border-[var(--color-border-strong)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Vẫn chưa tìm thấy câu trả lời?
            </h3>
            <p className="text-sm font-medium text-[var(--color-muted)]">
              Đội ngũ hỗ trợ kỹ thuật của chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn 24/7.
            </p>
          </div>
          <Link
            to={ROUTES.CONTACT}
            className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-extrabold text-sm flex items-center gap-2 shadow-md hover:scale-105 transition-all shrink-0"
          >
            <Mail size={16} />
            <span>Gửi câu hỏi cho chúng tôi</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
