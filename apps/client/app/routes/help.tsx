import type { Route } from "./+types/help";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bantuan - WeFoundIt" },
    { name: "description", content: "Bantuan dan pertanyaan yang sering diajukan" }
  ];
}

const faqs = [
    {
        question: "Bagaimana cara membuat akun di WeFoundIt?",
        answer:
            "Klik tombol 'Daftar' di halaman utama, lalu isi formulir pendaftaran dengan data yang benar. Setelah itu, verifikasi email Anda untuk mengaktifkan akun.",
    },
    {
        question: "Saya lupa password, apa yang harus dilakukan?",
        answer:
            "Klik 'Lupa Password' pada halaman login, masukkan email Anda, dan ikuti instruksi yang dikirimkan ke email untuk mengatur ulang password.",
    },
    {
        question: "Bagaimana cara melaporkan barang hilang?",
        answer:
            "Setelah login, klik menu 'Laporkan Barang Hilang', lalu isi detail barang dan lokasi terakhir terlihat. Pastikan informasi yang diberikan lengkap dan akurat.",
    },
    {
        question: "Bagaimana cara mencari barang yang saya temukan?",
        answer:
            "Gunakan fitur pencarian di halaman utama atau browse semua laporan untuk mencari barang yang mungkin sudah dilaporkan hilang oleh pemiliknya.",
    },
    {
        question: "Bagaimana cara menghubungi pemilik barang?",
        answer:
            "Setelah login, Anda dapat menggunakan fitur chat untuk menghubungi pemilik barang atau pelapor secara langsung melalui platform kami.",
    },
    {
        question: "Apakah ada biaya untuk menggunakan WeFoundIt?",
        answer:
            "Tidak, WeFoundIt adalah platform gratis untuk membantu masyarakat menemukan barang hilang mereka dan memfasilitasi pengembalian barang.",
    },
    {
        question: "Bagaimana menghubungi tim dukungan?",
        answer:
            "Anda dapat menghubungi tim dukungan melalui email support@wefoundit.com atau melalui fitur chat bantuan di aplikasi pada jam kerja.",
    },
];

export default function Help() {
    return (
        <div className="min-h-screen bg-[#e1e1e1] dark:bg-[#1C1F23] py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/auth" 
                            className="text-blue-500 hover:text-blue-700 text-sm hover:underline"
                        >
                            ← Kembali ke Login
                        </Link>
                        <h1 className="text-3xl font-bold primary-text">
                            Bantuan & FAQ
                        </h1>
                    </div>
                    <Link 
                        to="/" 
                        className="text-blue-500 hover:text-blue-700 text-sm hover:underline"
                    >
                        Beranda
                    </Link>
                </div>

                {/* Welcome Section */}
                <div className="box-secondary rounded-lg p-6 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold primary-text mb-4">
                        Selamat datang di WeFoundIt! 
                    </h2>
                    <p className="primary-text text-lg leading-relaxed">
                        WeFoundIt adalah platform yang membantu Anda menemukan barang hilang dan melaporkan barang yang ditemukan. 
                        Di bawah ini adalah jawaban untuk pertanyaan yang sering diajukan.
                    </p>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold primary-text mb-6">
                        Pertanyaan yang Sering Diajukan
                    </h3>
                    
                    {faqs.map((faq, index) => (
                        <div key={index} className="box-secondary rounded-lg p-6 shadow-lg">
                            <h4 className="text-lg font-semibold primary-text mb-3">
                                {faq.question}
                            </h4>
                            <p className="primary-text leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Technical Support Section */}
                <div className="box-secondary rounded-lg p-6 mt-8 shadow-lg">
                    <h3 className="text-xl font-bold primary-text mb-4">
                        Bantuan Teknis
                    </h3>
                    <p className="primary-text mb-4 leading-relaxed">
                        Jika Anda mengalami kendala teknis, pastikan koneksi internet stabil dan browser Anda telah diperbarui ke versi terbaru. 
                        Jika masalah berlanjut, silakan hubungi tim dukungan kami.
                    </p>
                    <div className="space-y-2 primary-text">
                        <p><strong>Email:</strong> <a href="mailto:support@wefoundit.com" className="text-blue-500 hover:underline">support@wefoundit.com</a></p>
                        <p><strong>Telepon:</strong> (021) 1234-5678</p>
                        <p><strong>Jam Operasional:</strong> Senin - Jumat, 09:00 - 17:00 WIB</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex justify-center gap-4 mt-8">
                    <Link 
                        to="/auth" 
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/" 
                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-xs primary-text">
                        We<b>Found</b>It © 2025
                    </p>
                    <p className="text-xs primary-text">
                        Made with ❤️ by kelompok E3
                    </p>
                </div>
            </div>
        </div>
    );
}