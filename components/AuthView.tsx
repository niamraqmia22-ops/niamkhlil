
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthViewProps {
  onLogin: (role: UserRole) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600 text-white text-4xl shadow-2xl mb-6 transform -rotate-12">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">شام هب</h1>
          <p className="text-gray-500 mt-2">بوابتك لكل ما هو جديد ومميز في عالم الأعمال</p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setRole(UserRole.USER)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.USER ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
          >
            مستخدم عادي
          </button>
          <button 
            onClick={() => setRole(UserRole.OWNER)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.OWNER ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
          >
            صاحب مشروع
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === UserRole.OWNER && isRegistering && (
            <>
              <Input label="اسم المالك" type="text" placeholder="أدخل اسمك الكامل" />
              <Input label="اسم النشاط التجاري" type="text" placeholder="اسم مطعمك أو شركتك" />
              <Input label="رقم الهاتف" type="tel" placeholder="+963 ..." />
            </>
          )}
          <Input label="البريد الإلكتروني" type="email" placeholder="example@mail.com" />
          <Input label="كلمة المرور" type="password" placeholder="••••••••" />

          {isRegistering && (
            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" required />
              <label htmlFor="terms" className="text-xs text-gray-500">أوافق على الشروط والأحكام</label>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100"
          >
            {isRegistering ? 'إنشاء الحساب' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">أو المتابعة عبر</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon="fa-google" label="Google" />
          <SocialButton icon="fa-apple" label="Apple" />
        </div>

        <p className="text-center text-sm text-gray-500">
          {isRegistering ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 font-bold mr-1 hover:underline"
          >
            {isRegistering ? 'سجل دخولك' : 'أنشئ حساباً جديداً'}
          </button>
        </p>
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string; type: string; placeholder: string }> = ({ label, type, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-bold text-gray-700 mr-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
      required
    />
  </div>
);

const SocialButton: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-2xl hover:bg-gray-50 transition-colors">
    <i className={`fa-brands ${icon}`}></i>
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default AuthView;
