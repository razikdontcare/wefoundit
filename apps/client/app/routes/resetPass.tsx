import type { Route } from "./+types/resetPass";
import React, { useState } from 'react';
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reset Password - WeFoundIt" }, { name: "description", content: "Reset your password" }];
}

export default function ResetPass() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (password.length < 1) {
            setMessage('Password tidak boleh kosong.');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Konfirmasi password tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            // Ganti URL berikut dengan endpoint reset password backend Anda
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Password berhasil direset. Silakan login kembali.');
            } else {
                setMessage(data.message || 'Terjadi kesalahan.');
            }
        } catch (err) {
            setMessage('Gagal terhubung ke server.');
        }
        setLoading(false);
    };

    return (
        <div className='box-primary' style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className='font-bold'>Reset Password</h2>
                <Link 
                    to="/" 
                    className="text-blue-500 hover:text-blue-700 text-sm hover:underline"
                >
                    ← Home
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Password Baru</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className='border border-gray-300 rounded-md p-2 w-full box-secondary hover:bg-gray-100 transition duration-150 text-sm'
                        />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Konfirmasi Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className='border border-gray-300 rounded-md p-2 w-full box-secondary hover:bg-gray-100 transition duration-150 text-sm'
                    />
                </div>
                <button className='bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200' type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
                    {loading ? 'Memproses...' : 'Reset Password'}
                </button>
                <div className="mt-4 text-center">
                    <Link 
                        to="/auth" 
                        className="text-gray-500 hover:text-gray-700 text-sm underline"
                    >
                        Kembali ke Login
                    </Link>
                </div>
                {message && (
                    <div style={{ marginTop: 16, color: message.includes('berhasil') ? 'green' : 'red' }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}