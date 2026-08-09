import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  BarChart3,
  CheckCircle2,
  Star,
  Users,
  BrainCircuit,
  Rocket,
  Trophy,
  Clock,
  Cpu,
} from "lucide-react";
import { ROUTES } from "../../../constants/routes";

export function HomePage() {
  const stats = [
    {
      label: "Ngân hàng đề thi",
      value: "15,000+",
      color: "clay-blue",
      icon: BookOpen,
    },
    {
      label: "Lượt thi đã hoàn thành",
      value: "250,000+",
      color: "clay-purple",
      icon: Trophy,
    },
    {
      label: "Học sinh & Giáo viên",
      value: "45,000+",
      color: "clay-green",
      icon: Users,
    },
    {
      label: "Tỉ lệ hài lòng AI",
      value: "99.2%",
      color: "clay-orange",
      icon: Star,
    },
  ];

  const highlights = [
    {
      title: "Tạo Đề Thi Tự Động Bằng AI",
      description:
        "Trích xuất câu hỏi trắc nghiệm thông minh từ tài liệu PDF/văn bản chỉ trong vài giây với mức độ phân loại chính xác.",
      icon: Cpu,
      color: "clay-purple",
      badge: "Công nghệ AI 2026",
    },
    {
      title: "Chấm Điểm & Giải Thích Tức Thì",
      description:
        "Hệ thống chấm điểm tự động kèm lời giải chi tiết cho từng câu hỏi, giúp người học hiểu rõ bản chất vấn đề.",
      icon: Zap,
      color: "clay-orange",
      badge: "Chính xác 100%",
    },
    {
      title: "Thống Kê & Phân Tích Điểm Yếu",
      description:
        "Biểu đồ theo dõi tiến độ học tập trực quan. Đưa ra gợi ý cải thiện chính xác theo từng chủ đề kiến thức.",
      icon: BarChart3,
      color: "clay-blue",
      badge: "Báo cáo thông minh",
    },
    {
      title: "Thi Trực Tuyến Thời Gian Thực",
      description:
        "Giao diện làm bài hiện đại, tự động đếm ngược, đảo câu hỏi & đáp án tránh gian lận, trải nghiệm mượt mà.",
      icon: Clock,
      color: "clay-green",
      badge: "Bảo mật cao",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Tạo tài khoản miễn phí",
      desc: "Đăng ký nhanh chóng chỉ với vài thao tác để bắt đầu lộ trình ôn luyện cá nhân hoá.",
      icon: Users,
    },
    {
      step: "02",
      title: "Chọn môn học & Đề thi",
      desc: "Kho môn học phong phú từ Toán, Tiếng Anh... đến kiến thức chuyên ngành, các công nghệ như MySQL, ExpressJS...",
      icon: BookOpen,
    },
    {
      step: "03",
      title: "Làm bài & Nhận phân tích AI",
      desc: "Hoàn thành bài thi và nhận ngay bảng điểm chi tiết kèm phân tích điểm mạnh - điểm yếu.",
      icon: BrainCircuit,
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      role: "Học sinh Lớp 12 - Chuyên KHTN",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MinhAnh",
      content:
        "LearningHub giúp em nâng điểm môn Toán từ 7 lên 9.2 nhờ tính năng phân tích điểm yếu bằng AI vô cùng chi tiết!",
      rating: 5,
    },
    {
      name: "Thầy Trần Quốc Tuấn",
      role: "Giáo viên Vật Lý THPT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocTuan",
      content:
        "Công cụ AI Generator của LearningHub giúp tôi tạo đề thi thử 40 câu từ file bài giảng chỉ trong chưa đầy 1 phút. Quá tuyệt vời!",
      rating: 5,
    },
    {
      name: "Nguyễn Phan Anh Tú",
      role: "Sinh viên Đại học Phenikaa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HoangNam",
      content:
        "Giao diện Claymorphism rất mượt và đẹp mắt. Làm bài thi trên trên hệ thống cực kỳ thích.",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-20 pb-16 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary-100)] dark:bg-teal-950/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] shadow-sm animate-float">
            <Sparkles
              size={18}
              className="text-amber-500 fill-amber-500 animate-spin-slow"
            />
            <span className="text-xs sm:text-sm font-extrabold text-[var(--color-foreground)]">
              Nền tảng thi & tạo đề trắc nghiệm AI thế hệ mới
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--color-foreground)] tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Học Thông Minh <br /> Bứt Phá Điểm Số Cùng <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-teal-500 to-[var(--color-accent)]">
              LearningHub AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed">
            Hệ thống thi trắc nghiệm trực tuyến toàn diện cho Học sinh & Giáo
            viên. Đề thi phong phú, chấm điểm tức thì và hỗ trợ soạn đề tự động
            bằng AI.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to={ROUTES.REGISTER}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-teal-600 text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-3 border-teal-700"
            >
              <Rocket size={22} />
              <span>Bắt đầu luyện thi miễn phí</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              to={ROUTES.FEATURES}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] hover:border-[var(--color-primary)] text-[var(--color-foreground)] font-extrabold text-lg flex items-center justify-center gap-2 shadow-sm hover:bg-[var(--color-muted-bg)] transition-all cursor-pointer"
            >
              <BrainCircuit size={22} className="text-[var(--color-primary)]" />
              <span>Khám phá tính năng</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-extrabold text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span>100% Miễn phí trải nghiệm</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-500" />
              <span>AI Tạo câu hỏi chuẩn cấu trúc</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-blue-500" />
              <span>Không cần cài đặt ứng dụng</span>
            </div>
          </div>
        </div>

        {/* HERO PREVIEW CARD */}
        <div className="mt-14 max-w-5xl mx-auto clay-card p-4 sm:p-6 bg-[var(--color-surface)] relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-400" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-mono font-bold text-[var(--color-muted)] bg-[var(--color-muted-bg)] px-3 py-1 rounded-full">
              https://github.com/ngnhonk
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="clay-card-sm p-4 clay-blue space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Môn THPT Quốc Gia</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950">
                  Đề Chuẩn
                </span>
              </div>
              <h3 className="font-extrabold text-base">
                Toán Học Premium 2026
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                50 Câu hỏi • 90 Phút • Chống gian lận AI
              </p>
            </div>

            <div className="clay-card-sm p-4 clay-purple space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>AI Generator</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950">
                  Tự Động
                </span>
              </div>
              <h3 className="font-extrabold text-base">
                Vật Lý - Động Học Chất Điểm
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Tạo từ PDF bài giảng • Kèm lời giải
              </p>
            </div>

            <div className="clay-card-sm p-4 clay-green space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Thống Kê Học Tập</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950">
                  Real-time
                </span>
              </div>
              <h3 className="font-extrabold text-base">
                Phân Tích Tiến Độ Điểm Số
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Tăng 25% hiệu quả ôn luyện mỗi tuần
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`clay-card p-6 ${item.color} flex flex-col items-center text-center space-y-3`}
              >
                <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)]">
                  <Icon size={28} className="text-[var(--color-primary)]" />
                </div>
                <span
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[var(--color-muted)]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tính Năng Nổi Bật Dành Cho Bạn
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] font-medium">
            Trải nghiệm các công cụ luyện thi hiện đại được tối ưu hóa cho hiệu
            quả học tập đột phá.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`clay-card p-8 ${item.color} space-y-5 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)]">
                      <Icon size={32} className="text-[var(--color-primary)]" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-primary)]">
                      {item.badge}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-[var(--color-foreground)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-muted)] text-base font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={ROUTES.FEATURES}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--color-primary)] hover:underline"
                  >
                    <span>Xem chi tiết tính năng này</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-[var(--color-surface-2)] border-y-3 border-[var(--color-border-strong)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quy Trình 3 Bước Đơn Giản
            </h2>
            <p className="text-base text-[var(--color-muted)] font-medium">
              Bắt đầu ôn luyện ngay hôm nay không tốn chút thời gian thiết lập
              nào.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="clay-card p-8 bg-[var(--color-surface)] relative space-y-4 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white font-black text-xl flex items-center justify-center mx-auto shadow-md gap-1">
                    <Icon size={20} />
                  </div>
                  <h3
                    className="text-xl font-extrabold text-[var(--color-foreground)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-muted)] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Học Sinh & Giáo Viên Nói Gì?
          </h2>
          <p className="text-base text-[var(--color-muted)] font-medium">
            Cảm nhận thực tế từ những người dùng đang đồng hành cùng
            LearningHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="clay-card p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-foreground)] font-medium italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border-strong)]"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[var(--color-foreground)]">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] font-semibold">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card p-10 sm:p-14 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary)] to-emerald-600 text-white text-center space-y-6 clay-purple">
          <h2
            className="text-3xl sm:text-5xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sẵn Sàng Nâng Cao Điểm Số Ngay Hôm Nay?
          </h2>
          <p className="text-base sm:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Gia nhập cộng đồng hơn 45,000+ học sinh và giáo viên trên khắp cả
            nước.
          </p>
          <div className="pt-2">
            <Link
              to={ROUTES.REGISTER}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-3 border-amber-500"
            >
              <span>Đăng ký tài khoản miễn phí</span>
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
