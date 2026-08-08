import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const features = [
    {
      title: 'React 19',
      description: 'Thư viện JavaScript phổ biến nhất để xây dựng giao diện người dùng tương tác.',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1m0 0L10 4m2-1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m0 0l-2 1m2-1v-2.5M6 18l-2-1m2 1l-2 1m2-1v-2.5" />
        </svg>
      ),
      gradient: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30'
    },
    {
      title: 'Vite',
      description: 'Công cụ build cực nhanh với Hot Module Replacement (HMR) tức thì.',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    },
    {
      title: 'Tailwind CSS v4',
      description: 'Framework CSS utility-first giúp thiết kế UI hiện đại, mượt mà và linh hoạt.',
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      gradient: 'from-sky-500/20 to-emerald-500/20',
      border: 'border-sky-500/30'
    },
    {
      title: 'TypeScript',
      description: 'Tăng cường độ tin cậy với hệ thống Type checking mạnh mẽ.',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/30'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              ⚡
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Vite App
          </span>
        </div>
        <div className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready for Development
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto w-full my-auto py-12 text-center z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-slate-300 text-sm mb-8 shadow-inner">
          <span className="text-cyan-400 font-medium">React</span> +
          <span className="text-purple-400 font-medium">Vite</span> +
          <span className="text-sky-400 font-medium">Tailwind CSS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Setup hoàn tất thành công! <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            Bắt đầu phát triển ứng dụng ngay.
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Dự án của bạn đã sẵn sàng với cấu hình tối ưu nhất. Mọi thay đổi trong mã nguồn sẽ được cập nhật tức thì (HMR).
        </p>

        {/* Counter Demo */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-500/25 flex items-center gap-3 group cursor-pointer"
          >
            <span>Đã bấm: <strong className="text-cyan-200 font-bold">{count}</strong> lần</span>
            <span className="group-hover:translate-x-1 transition-transform">🚀</span>
          </button>
          
          <code className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-sm">
            Chỉnh sửa <span className="text-indigo-400">src/App.tsx</span>
          </code>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 w-fit mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-slate-500 text-sm z-10 pt-6 border-t border-slate-900">
        Khởi tạo tại <code className="text-slate-400">client/</code> với Vite, React & Tailwind CSS.
      </footer>
    </div>
  )
}

export default App
