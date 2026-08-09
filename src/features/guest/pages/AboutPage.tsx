import { Link } from 'react-router-dom';
import { Target, Eye, Sparkles, Heart, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export function AboutPage() {
  const coreValues = [
    {
      title: 'Đổi Mới Công Nghệ',
      desc: 'Ứng dụng AI mới nhất nhằm mang lại trải nghiệm thi trực tuyến mượt mà và thông minh nhất.',
      icon: Sparkles,
      color: 'clay-purple',
    },
    {
      title: 'Cá Nhân Hóa Học Tập',
      desc: 'Mỗi học sinh đều có lộ trình và nhận diện điểm yếu riêng biệt để tiến bộ nhanh chóng.',
      icon: Target,
      color: 'clay-blue',
    },
    {
      title: 'Hỗ Trợ Giáo Viên Tối Đa',
      desc: 'Giúp thầy cô giảm bớt 80% thời gian biên soạn câu hỏi và chấm thi thủ công.',
      icon: Award,
      color: 'clay-green',
    },
    {
      title: 'Công Bằng & Bảo Mật',
      desc: 'Hệ thống xáo trộn đề và giám sát chống gian lận đảm bảo tính minh bạch cho kỳ thi.',
      icon: ShieldCheck,
      color: 'clay-orange',
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Khởi Tạo Nền Tảng',
      desc: 'Phát triển phiên bản thử nghiệm ngân hàng đề thi trắc nghiệm phục vụ học sinh THPT.',
    },
    {
      year: '2025',
      title: 'Tích Hợp Chấm Thi AI',
      desc: 'Ra mắt tính năng tự động chấm điểm và giải thích đáp án trực tiếp bằng AI.',
    },
    {
      year: '2026',
      title: 'Hệ Thống Toàn Diện',
      desc: 'Bổ sung AI Question Generator từ file PDF, thống kê radar học tập và phân quyền giáo viên nâng cao.',
    },
  ];

  const team = [
    {
      name: 'Nguyễn Việt Hùng',
      role: 'Co-Founder & AI Architect',
      avatar: 'https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Jerr',
      bio: 'Sinh Viên năm cuối Đại học Phenikaa.',
    },
    {
      name: 'Nguyễn Việt Hùng',
      role: 'Product Lead & EdTech Specialist',
      avatar: 'https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Jerr',
      bio: 'Sinh Viên năm cuối Đại học Phenikaa.',
    },
    {
      name: 'Nguyễn Việt Hùng',
      role: 'Lead Fullstack Engineer',
      avatar: 'https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Jerr',
      bio: 'Sinh Viên năm cuối Đại học Phenikaa.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HEADER SECTION */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] shadow-sm">
          <Heart size={18} className="text-red-500 fill-red-500" />
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-foreground)]">
            Về chúng tôi — LearningHub
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-foreground)] tracking-tight max-w-3xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Kiến Tạo Tương Lai Học Tập Bằng <span className="text-[var(--color-primary)]">Trí Tuệ Nhân Tạo</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-muted)] font-medium max-w-3xl mx-auto leading-relaxed">
          LearningHub ra đời với sứ mệnh mang đến giải pháp luyện thi và quản lý đề thi trắc nghiệm công bằng, hiệu quả và cá nhân hóa tối đa cho từng học sinh Việt Nam.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="clay-card p-8 clay-purple space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md">
            <Target size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Sứ Mệnh Của Chúng Tôi
          </h2>
          <p className="text-[var(--color-muted)] font-medium leading-relaxed">
            Giúp học sinh tự tin chinh phục các kỳ thi bằng việc hiểu rõ điểm mạnh, điểm yếu thông qua phân tích AI. Đồng thời giải phóng thời gian biên soạn đề thi thủ công cho các thầy cô giáo.
          </p>
        </div>

        <div className="clay-card p-8 clay-blue space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md">
            <Eye size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Tầm Nhìn 2030
          </h2>
          <p className="text-[var(--color-muted)] font-medium leading-relaxed">
            Trở thành hệ thống thi và đánh giá năng lực học tập bằng AI hàng đầu tại Việt Nam, kết nối hàng triệu học sinh và giáo viên trong một hệ sinh thái học tập số hiện đại.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Giá Trị Cốt Lõi
          </h2>
          <p className="text-base text-[var(--color-muted)] font-medium">
            Kim chỉ nam cho mọi tính năng và sản phẩm được xây dựng tại LearningHub.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className={`clay-card p-6 ${v.color} space-y-3`}>
                <div className="p-3 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] w-fit">
                  <Icon size={24} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] font-medium leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="bg-[var(--color-surface-2)] border-y-3 border-[var(--color-border-strong)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Cột Mốc Phát Triển
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="clay-card p-6 bg-[var(--color-surface)] flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="px-5 py-2 rounded-2xl bg-[var(--color-primary)] text-white font-black text-2xl shadow-md shrink-0">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[var(--color-foreground)]">{m.title}</h3>
                  <p className="text-sm font-medium text-[var(--color-muted)]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Đội Ngũ Sáng Tạo
          </h2>
          <p className="text-base text-[var(--color-muted)] font-medium">
            Những con người tâm huyết đứng sau các thuật toán và tính năng của hệ thống.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <div key={idx} className="clay-card p-6 text-center space-y-4">
              <img src={t.avatar} alt={t.name} className="w-24 h-24 rounded-3xl mx-auto bg-[var(--color-muted-bg)] border-3 border-[var(--color-border-strong)] p-1" />
              <div>
                <h3 className="text-xl font-extrabold text-[var(--color-foreground)]">{t.name}</h3>
                <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">{t.role}</p>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-medium leading-relaxed">
                {t.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
          Tham Gia Cùng LearningHub Ngay Hôm Nay
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            to={ROUTES.REGISTER}
            className="px-6 py-3.5 rounded-2xl bg-[var(--color-primary)] text-white font-extrabold text-base flex items-center gap-2 shadow-md hover:scale-105 transition-all"
          >
            <span>Tạo tài khoản học viên</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
