import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useLogin } from '../hooks/useLogin';
import { ROUTES } from '../../../constants/routes';

const floatingItems = [
  { icon: '📚', style: 'top-[10%] left-[5%] animation-delay-0' },
  { icon: '🎓', style: 'top-[20%] right-[8%] animation-delay-500' },
  { icon: '⭐', style: 'top-[60%] left-[3%] animation-delay-1000' },
  { icon: '🎯', style: 'bottom-[15%] right-[6%] animation-delay-300' },
  { icon: '🧠', style: 'bottom-[30%] left-[8%] animation-delay-700' },
  { icon: '🚀', style: 'top-[40%] right-[3%] animation-delay-200' },
];

export function LoginPage() {
  const [identify, setIdentify] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identify.trim() || !password) return;
    login({ identify, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #FFF7ED 50%, #FAF5FF 100%)' }}>

      {/* Animated background blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-teal-200/50 animate-blob" />
      <div className="absolute top-[60%] right-[-60px] w-56 h-56 rounded-full bg-purple-200/40 animate-blob"
        style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-60px] left-[30%] w-64 h-64 rounded-full bg-orange-200/40 animate-blob"
        style={{ animationDelay: '4s' }} />

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <div key={i} className={`absolute text-3xl select-none pointer-events-none animate-float-slow ${item.style}`}
          style={{ animationDelay: `${i * 0.4}s` }}>
          {item.icon}
        </div>
      ))}

      {/* Card */}
      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Header decoration */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 border-4 border-teal-700 shadow-[4px_4px_0px_#0f766e] mb-4 animate-bounce-in"
            style={{ borderWidth: '4px' }}>
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Chào mừng trở lại! 👋
          </h1>
          <p className="text-[var(--color-muted)] mt-1">Đăng nhập để tiếp tục học tập</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-3xl p-7 border-3 border-teal-300 shadow-[6px_6px_0px_#0d9488]"
          style={{ borderWidth: '3px' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="login-identify"
              label="Tên đăng nhập / Email"
              type="text"
              placeholder="Nhập username hoặc email..."
              value={identify}
              onChange={(e) => setIdentify(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />

            <Input
              id="login-password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer hover:text-[var(--color-primary)] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isPending}
              size="lg"
              rightIcon={<Sparkles size={18} />}
            >
              {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t-2 border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-muted)]">
              Chưa có tài khoản?{' '}
              <Link to={ROUTES.REGISTER}
                className="font-bold text-[var(--color-primary)] hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex justify-center gap-3 mt-5 flex-wrap">
          {[
            { icon: <BookOpen size={14} />, label: 'Học mọi lúc' },
            { icon: <Trophy size={14} />, label: 'Thi thử vui' },
            { icon: <Sparkles size={14} />, label: 'AI thông minh' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[var(--color-border-strong)] text-xs font-bold text-[var(--color-foreground)] shadow-[2px_2px_0px_var(--color-border-strong)]">
              <span className="text-[var(--color-primary)]">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
