import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Sparkles, Shield, Award, Globe, Share2, MessageCircle, ShieldUser } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export function GuestFooter() {
  return (
    <footer className="bg-[var(--color-surface)] border-t-3 border-[var(--color-border-strong)] pt-16 pb-12 mt-20" style={{ borderTopWidth: '3px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--color-border)]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[var(--color-surface)] rounded-[14px] flex items-center justify-center font-bold text-lg text-[var(--color-primary)]">
                  ⚡
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Learning<span className="text-[var(--color-accent)]">Hub</span>
              </span>
            </Link>

            <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-sm">
              Nền tảng luyện thi & quản lý đề thi trắc nghiệm trực tuyến tích hợp AI tiên tiến. Giúp học sinh học tập thông minh hơn và giáo viên tiết kiệm thời gian biên soạn đề.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-[var(--color-muted-bg)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-foreground)] flex items-center justify-center transition-all cursor-pointer shadow-sm">
                <Globe size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[var(--color-muted-bg)] hover:bg-red-500 hover:text-white text-[var(--color-foreground)] flex items-center justify-center transition-all cursor-pointer shadow-sm">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[var(--color-muted-bg)] hover:bg-slate-800 hover:text-white text-[var(--color-foreground)] flex items-center justify-center transition-all cursor-pointer shadow-sm">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-lg text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Khám phá
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link to={ROUTES.HOME} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Giới thiệu hệ thống
                </Link>
              </li>
              <li>
                <Link to={ROUTES.FEATURES} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Tính năng nổi bật
                </Link>
              </li>
              <li>
                <Link to={ROUTES.FAQ} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Hướng dẫn & FAQ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Liên hệ hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-lg text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Tính năng AI
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li className="text-[var(--color-muted)] flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                <span>Tạo câu hỏi AI tự động</span>
              </li>
              <li className="text-[var(--color-muted)] flex items-center gap-1.5">
                <Award size={14} className="text-teal-500" />
                <span>Chấm điểm & giải thích</span>
              </li>
              <li className="text-[var(--color-muted)] flex items-center gap-1.5">
                <Shield size={14} className="text-purple-500" />
                <span>Ngân hàng đề thi chuẩn hoá</span>
              </li>
              <li className="text-[var(--color-muted)] flex items-center gap-1.5">
                <Sparkles size={14} className="text-sky-500" />
                <span>Phân tích biểu đồ học tập</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-lg text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Liên hệ
            </h4>
            <div className="space-y-3 text-sm font-medium text-[var(--color-muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>Hà Đông, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={18} className="text-[var(--color-accent)] shrink-0" />
                <span>hungnguyenviet204@gmail.com</span>
              </div>
                <div className="flex items-center gap-2.5">
                <ShieldUser size={18} className="text-emerald-500 shrink-0" />
                <span>Nguyễn Việt Hùng</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>0916105980</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} ngnhonk. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-1">
            <span>Thiết kế với</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>cho cộng đồng giáo dục Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
