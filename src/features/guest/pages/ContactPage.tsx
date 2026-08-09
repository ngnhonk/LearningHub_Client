import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Góp ý hệ thống',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }
    setSubmitted(true);
    toast.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER SECTION */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] shadow-sm">
          <MessageSquare size={18} className="text-[var(--color-primary)]" />
          <span className="text-xs sm:text-sm font-extrabold text-[var(--color-foreground)]">
            Liên hệ & Hỗ trợ khách hàng
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-foreground)] tracking-tight max-w-3xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Chúng Tôi Luôn Lắng Nghe Ý Kiến Của Bạn
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed">
          Có thắc mắc, đề xuất hợp tác hoặc báo lỗi hệ thống? Vui lòng gửi tin nhắn hoặc gọi điện trực tiếp cho đội ngũ hỗ trợ.
        </p>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-7 clay-card p-8 sm:p-10 bg-[var(--color-surface)] space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Gửi Tin Nhắn Cho Chúng Tôi
            </h2>
            <p className="text-sm font-medium text-[var(--color-muted)]">
              Điền thông tin vào form dưới đây, chúng tôi sẽ phản hồi qua email trong vòng 24 giờ.
            </p>
          </div>

          {submitted ? (
            <div className="clay-card p-8 bg-emerald-500/10 border-2 border-emerald-500 text-center space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Cảm Ơn Bạn Đã Liên Hệ!</h3>
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Tin nhắn của bạn đã được ghi nhận. Đội ngũ LearningHub sẽ phản hồi lại bạn sớm nhất có thể.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', email: '', subject: 'Góp ý hệ thống', message: '' });
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold text-sm cursor-pointer shadow-md hover:bg-emerald-600 transition-all"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold uppercase text-[var(--color-muted)]">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none font-bold text-sm text-[var(--color-foreground)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold uppercase text-[var(--color-muted)]">Địa chỉ Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none font-bold text-sm text-[var(--color-foreground)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-[var(--color-muted)]">Chủ đề liên hệ</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none font-bold text-sm text-[var(--color-foreground)]"
                >
                  <option value="Góp ý hệ thống">Góp ý cải tiến hệ thống</option>
                  <option value="Báo lỗi kỹ thuật">Báo lỗi kỹ thuật / Lỗi đề thi</option>
                  <option value="Hợp tác trường học">Hợp tác trường học / Giáo viên</option>
                  <option value="Khác">Chủ đề khác</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-[var(--color-muted)]">Nội dung tin nhắn *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Nhập nội dung tin nhắn hoặc góp ý chi tiết tại đây..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] outline-none font-bold text-sm text-[var(--color-foreground)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all border-2 border-teal-700"
              >
                <Send size={18} />
                <span>Gửi Tin Nhắn Ngay</span>
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: CONTACT INFO & MAP */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="clay-card p-8 clay-purple space-y-6">
            <h3 className="text-xl font-extrabold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Thông Tin Liên Hệ Direct
            </h3>

            <div className="space-y-4 font-medium text-sm text-[var(--color-foreground)]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] text-[var(--color-primary)]">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Địa chỉ văn phòng</h4>
                  <p className="text-[var(--color-muted)]">Đại học Phenikaa, Hà Đông, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] text-[var(--color-accent)]">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Email Hỗ Trợ</h4>
                  <p className="text-[var(--color-muted)]">22010323@st.phenikaa-uni.edu.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] text-emerald-500">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Hotline Kỹ Thuật</h4>
                  <p className="text-[var(--color-muted)]">1908 2004</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border-strong)] text-amber-500">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Giờ Làm Việc</h4>
                  <p className="text-[var(--color-muted)]">Thứ 2 - Thứ 7: 08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="clay-card p-6 bg-[var(--color-surface)] space-y-3">
            <div className="flex items-center gap-2 text-[var(--color-primary)] font-extrabold text-sm">
              <Sparkles size={18} />
              <span>Hỗ trợ dành riêng cho Nhà trường & Trung tâm</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] font-medium leading-relaxed">
              Cần triển khai hệ thống thi trắc nghiệm AI quy mô lớn cho trường học hoặc trung tâm luyện thi? Liên hệ với chúng tôi qua hotline để nhận tư vấn tài khoản Enterprise.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
