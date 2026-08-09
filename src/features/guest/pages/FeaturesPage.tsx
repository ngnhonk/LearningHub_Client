import { Link } from 'react-router-dom';
import { Cpu, Zap, BarChart3, FileSpreadsheet, Sparkles, Check, X, ArrowRight, Layers } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export function FeaturesPage() {
  const mainFeatures = [
    {
      id: 'ai-gen',
      title: 'Tạo Câu Hỏi Tự Động Bằng AI (AI Generator)',
      desc: 'Công nghệ AI trích xuất câu hỏi trắc nghiệm tự động từ tài liệu học tập PDF/DOCX chỉ trong vài giây. Hỗ trợ tạo câu hỏi phân loại 4 mức độ tư duy.',
      icon: Cpu,
      color: 'clay-purple',
      details: [
        'Nhập văn bản bài giảng hoặc tải tệp PDF lên',
        'Tuỳ chỉnh số lượng câu hỏi và độ khó mong muốn',
        'Tự động sinh đáp án đúng và lời giải chi tiết',
        'Chỉnh sửa linh hoạt trước khi lưu vào ngân hàng đề',
      ],
    },
    {
      id: 'online-exam',
      title: 'Thi Trực Tuyến & Chấm Điểm Tức Thì',
      desc: 'Giao diện thi trực quan, thân thiện. Hỗ trợ đảo câu hỏi & đáp án tránh gian lận, cùng bộ đếm giờ chuẩn xác.',
      icon: Zap,
      color: 'clay-orange',
      details: [
        'Bộ đếm thời gian thông minh kèm cảnh báo sắp hết giờ',
        'Chế độ xem lại bài làm kèm giải thích đáp án tức thì',
        'Tự động nộp bài khi hết giờ hoặc mất kết nối mạng',
        'Tương thích hoàn hảo trên Máy tính, Máy tính bảng & Điện thoại',
      ],
    },
    {
      id: 'analytics',
      title: 'Thống Kê & Phân Tích Lộ Trình Học Tập',
      desc: 'Báo cáo chi tiết điểm số, tốc độ làm bài và biểu đồ radar nhận diện lỗ hổng kiến thức chính xác.',
      icon: BarChart3,
      color: 'clay-blue',
      details: [
        'Biểu đồ tiến độ điểm số qua từng đợt làm bài',
        'Phân tích tỉ lệ đúng/sai theo từng chủ đề kiến thức',
        'Gợi ý các dạng bài tập cần ôn luyện thêm',
        'Bảng xếp hạng thi đua tích cực',
      ],
    },
    {
      id: 'import-excel',
      title: 'Ngân Hàng Đề Thi & Import Excel Nhanh',
      desc: 'Quản lý kho đề thi khoa học theo môn học. Tải mẫu Excel và import hàng trăm câu hỏi chỉ với 1 click.',
      icon: FileSpreadsheet,
      color: 'clay-green',
      details: [
        'Tải mẫu file Excel chuẩn hỗ trợ sẵn câu hỏi trắc nghiệm',
        'Kiểm tra lỗi định dạng file tự động trước khi import',
        'Phân loại đề thi theo môn học, khối lớp và thẻ tag',
        'Phân quyền truy cập đề thi cho Giáo viên & Học sinh',
      ],
    },
  ];

  const comparisons = [
    {
      feature: 'Thời gian biên soạn 40 câu hỏi',
      traditional: '2 - 3 Giờ biên soạn thủ công',
      learninghub: 'Dưới 1 Phút với AI Generator',
    },
    {
      feature: 'Thời gian chấm bài & trả kết quả',
      traditional: '1 - 2 Ngày chấm thi',
      learninghub: 'Tức thì (0.5 giây sau nộp bài)',
    },
    {
      feature: 'Giải thích đáp án cho học sinh',
      traditional: 'Hạn chế hoặc phải đợi giáo viên chữa',
      learninghub: 'Chi tiết từng câu kèm phân tích AI',
    },
    {
      feature: 'Nhận diện điểm yếu kiến thức',
      traditional: 'Học sinh tự ước lượng cảm tính',
      learninghub: 'Biểu đồ Radar phân tích tự động',
    },
    {
      feature: 'Chống gian lận khi làm bài',
      traditional: 'Cần nhiều giám thị coi thi',
      learninghub: 'Xáo trộn đề & đếm ngược chống gian lận',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HEADER SECTION */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] shadow-sm">
          <Layers size={18} className="text-[var(--color-primary)]" />
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-foreground)]">
            Hệ sinh thái tính năng đột phá
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-foreground)] tracking-tight max-w-3xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Mọi Tính Năng Bạn Cần Để <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            Bứt Phá Hiệu Quả Luyện Thi
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed">
          Khám phá trọn bộ công cụ dành cho Học sinh & Giáo viên được thiết kế tỉ mỉ mang lại trải nghiệm ôn thi tuyệt vời nhất.
        </p>
      </section>

      {/* DETAILED FEATURES LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {mainFeatures.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;
          return (
            <div
              key={item.id}
              className={`clay-card p-8 sm:p-12 ${item.color} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}
            >
              <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="p-3.5 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] w-fit">
                  <Icon size={32} className="text-[var(--color-primary)]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-muted)] font-medium leading-relaxed">
                  {item.desc}
                </p>

                <div className="space-y-3 pt-2">
                  {item.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 text-sm font-bold text-[var(--color-foreground)]">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-dark)] flex items-center justify-center shrink-0 border border-[var(--color-primary)]">
                        <Check size={14} />
                      </div>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview UI Box */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="clay-card-sm p-6 bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-muted)]">
                    <span className="uppercase tracking-wider">Demo UI Feature</span>
                    <Sparkles size={16} className="text-amber-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] text-xs font-bold space-y-1">
                      <div className="text-[var(--color-primary)] font-extrabold">Câu 1: [Nhận biết]</div>
                      <p>Phương trình bậc hai ax² + bx + c = 0 (a ≠ 0) có biệt thức Δ bằng?</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <Check size={14} />
                      <span>Đáp án đúng: A. Δ = b² - 4ac</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* COMPARISON MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
            So Sánh Hiệu Quả
          </h2>
          <p className="text-base text-[var(--color-muted)] font-medium">
            Tại sao phương pháp ôn thi AI trên LearningHub vượt trội hơn thi giấy truyền thống?
          </p>
        </div>

        <div className="clay-card p-4 sm:p-8 bg-[var(--color-surface)] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-3 border-[var(--color-border-strong)]">
                <th className="pb-4 font-black text-base text-[var(--color-foreground)]">Tiêu chí</th>
                <th className="pb-4 font-black text-base text-red-500">Thi truyền thống</th>
                <th className="pb-4 font-black text-base text-[var(--color-primary)]">LearningHub AI ⚡</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] font-semibold text-sm">
              {comparisons.map((c, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-muted-bg)] transition-colors">
                  <td className="py-4 text-[var(--color-foreground)] font-bold">{c.feature}</td>
                  <td className="py-4 text-[var(--color-muted)] flex items-center gap-2">
                    <X size={16} className="text-red-500 shrink-0" />
                    <span>{c.traditional}</span>
                  </td>
                  <td className="py-4 text-[var(--color-primary-dark)] font-extrabold flex items-center gap-2">
                    <Check size={16} className="text-emerald-500 shrink-0" />
                    <span>{c.learninghub}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
          Trải Nghiệm Tất Cả Tính Năng Ngay Hôm Nay
        </h2>
        <Link
          to={ROUTES.REGISTER}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--color-primary)] text-white font-extrabold text-lg shadow-lg hover:scale-105 transition-all"
        >
          <span>Tạo tài khoản miễn phí</span>
          <ArrowRight size={20} />
        </Link>
      </section>

    </div>
  );
}
