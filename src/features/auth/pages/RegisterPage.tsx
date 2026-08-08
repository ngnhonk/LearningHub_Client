import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useRegister } from '../hooks/useLogin';
import { ROUTES } from '../../../constants/routes';

export function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useRegister();

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #FFF1F2 50%, #FFF7ED 100%)' }}>

      {/* Blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-purple-200/50 animate-blob" />
      <div className="absolute bottom-[-80px] left-[-40px] w-72 h-72 rounded-full bg-pink-200/40 animate-blob"
        style={{ animationDelay: '2s' }} />
      <div className="absolute top-[50%] left-[60%] w-48 h-48 rounded-full bg-orange-200/40 animate-blob"
        style={{ animationDelay: '4s' }} />

      {/* Floating emojis */}
      {['🌟', '📖', '💡', '🎉', '🏆', '✏️'].map((e, i) => (
        <div key={i} className="absolute text-3xl select-none pointer-events-none animate-float"
          style={{
            top: `${10 + i * 13}%`,
            [i % 2 === 0 ? 'left' : 'right']: `${3 + (i % 3) * 3}%`,
            animationDelay: `${i * 0.5}s`
          }}>
          {e}
        </div>
      ))}

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-purple-700 shadow-[4px_4px_0px_#7c3aed] mb-4"
            style={{ borderWidth: '4px' }}>
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-foreground)]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Tham gia ngay! 🎊
          </h1>
          <p className="text-[var(--color-muted)] mt-1">Tạo tài khoản để bắt đầu hành trình học tập</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-7 border-3 border-purple-300 shadow-[6px_6px_0px_#9333ea]"
          style={{ borderWidth: '3px' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="register-fullname"
              label="Họ và tên"
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.full_name}
              onChange={set('full_name')}
              required
              autoFocus
            />
            <Input
              id="register-username"
              label="Tên đăng nhập"
              type="text"
              placeholder="nguyenvana"
              value={form.username}
              onChange={set('username')}
              required
              hint="Chỉ dùng chữ cái, số và dấu gạch dưới"
            />
            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="a@example.com"
              value={form.email}
              onChange={set('email')}
              required
            />
            <Input
              id="register-password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Tối thiểu 8 ký tự, có chữ hoa và số"
              value={form.password}
              onChange={set('password')}
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer hover:text-[var(--color-primary)] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <Button
              type="submit"
              variant="secondary"
              fullWidth
              isLoading={isPending}
              size="lg"
            >
              {isPending ? 'Đang đăng ký...' : 'Đăng ký tài khoản 🚀'}
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t-2 border-[var(--color-border)] text-center">
            <Link to={ROUTES.LOGIN}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:underline">
              <ArrowLeft size={14} />
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
