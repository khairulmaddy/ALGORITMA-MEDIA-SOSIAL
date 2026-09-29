import { Question } from '../types';

export const EXAM_TITLE = "ASESMEN DIGITAL ONBOARDING";
export const EXAM_SUBTITLE = "Memahami Algoritma Digital Marketing";
export const EXAM_TOPIC = "Cara Kerja Algoritma pada Media Sosial (Facebook, TikTok, Twitter/X, Instagram, YouTube)";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Algoritma media sosial dirancang untuk menampilkan konten yang paling relevan dan menarik bagi setiap pengguna berdasarkan perilakunya di platform.",
    correctAnswer: "BENAR",
    explanation: "Algoritma mempelajari kebiasaan pengguna (like, comment, watch time, dll) untuk menyajikan konten yang paling sesuai dengan minatnya."
  },
  {
    id: 2,
    question: "Semakin banyak followers sebuah akun, maka otomatis semua postingannya akan selalu muncul di beranda seluruh followers tersebut.",
    correctAnswer: "SALAH",
    explanation: "Jumlah followers besar tidak menjamin jangkauan; algoritma tetap menyaring berdasarkan engagement dan relevansi konten, bukan jumlah followers semata."
  },
  {
    id: 3,
    question: "Di TikTok, algoritma For You Page (FYP) sangat mempertimbangkan watch time atau berapa lama video ditonton oleh pengguna.",
    correctAnswer: "BENAR",
    explanation: "TikTok sangat mengutamakan durasi tonton (completion rate/watch time) sebagai sinyal utama kualitas konten."
  },
  {
    id: 4,
    question: "Algoritma Instagram hanya menampilkan konten secara berurutan sesuai waktu posting (kronologis), sama seperti dahulu.",
    correctAnswer: "SALAH",
    explanation: "Instagram sudah lama beralih dari feed kronologis penuh menjadi feed berbasis algoritma yang mempertimbangkan minat, interaksi, dan kedekatan pengguna."
  },
  {
    id: 5,
    question: "Engagement seperti like, comment, share, dan save menjadi sinyal penting bagi algoritma untuk menilai kualitas sebuah konten.",
    correctAnswer: "BENAR",
    explanation: "Interaksi pengguna adalah indikator utama yang digunakan hampir semua platform untuk menentukan seberapa layak konten disebarluaskan."
  },
  {
    id: 6,
    question: "Algoritma YouTube hanya mempertimbangkan jumlah klik pada thumbnail (Click Through Rate) tanpa memperhatikan berapa lama video ditonton setelah diklik.",
    correctAnswer: "SALAH",
    explanation: "YouTube menilai kombinasi CTR dan retensi penonton (audience retention); video yang banyak diklik tapi cepat ditinggalkan tetap dianggap kurang berkualitas."
  },
  {
    id: 7,
    question: "Di platform X (Twitter), kecepatan dan keterkinian (recency) sebuah unggahan menjadi salah satu faktor penting agar konten cepat terlihat.",
    correctAnswer: "BENAR",
    explanation: "X/Twitter dikenal sebagai platform real-time, sehingga faktor waktu unggah dan tren terkini sangat memengaruhi visibilitas konten."
  },
  {
    id: 8,
    question: "Algoritma Facebook saat ini memprioritaskan konten dari teman dan keluarga dibandingkan konten dari halaman bisnis secara default.",
    correctAnswer: "BENAR",
    explanation: "Facebook secara umum lebih memprioritaskan interaksi bermakna dari koneksi pribadi (teman/keluarga) dibanding konten dari Page bisnis."
  },
  {
    id: 9,
    question: "Konten yang banyak mendapat komentar negatif atau report dari pengguna akan tetap diprioritaskan sama besar oleh algoritma seperti konten dengan interaksi positif.",
    correctAnswer: "SALAH",
    explanation: "Sinyal negatif (report, hide, dislike, komentar dihapus) menurunkan skor kualitas konten di mata algoritma, sehingga jangkauannya cenderung ditekan."
  },
  {
    id: 10,
    question: "Memahami cara kerja algoritma penting bagi pelaku digital marketing agar dapat menyusun strategi konten yang lebih efektif dan tepat sasaran.",
    correctAnswer: "BENAR",
    explanation: "Pemahaman algoritma membantu marketer mengoptimalkan waktu posting, format konten, dan strategi engagement agar jangkauan lebih maksimal."
  },
  {
    id: 11,
    question: "Algoritma media sosial dapat menggunakan riwayat interaksi pengguna untuk memperkirakan jenis konten yang mungkin disukai pengguna.",
    correctAnswer: "BENAR",
    explanation: "Riwayat like, komentar, tontonan, dan interaksi lainnya dapat menjadi sinyal untuk memahami minat pengguna."
  },
  {
    id: 12,
    question: "Jika sebuah video memiliki banyak penonton, algoritma pasti akan terus menampilkannya tanpa mempertimbangkan perilaku penonton berikutnya.",
    correctAnswer: "SALAH",
    explanation: "Jumlah penonton bukan satu-satunya pertimbangan; respons penonton, durasi tonton, dan relevansi juga dapat diperhatikan."
  },
  {
    id: 13,
    question: "Watch time menunjukkan berapa lama pengguna menonton sebuah video.",
    correctAnswer: "BENAR",
    explanation: "Watch time adalah ukuran durasi waktu yang dihabiskan penonton untuk menonton video."
  },
  {
    id: 14,
    question: "Konten yang membuat pengguna berhenti menonton dengan cepat dapat menunjukkan bahwa konten tersebut kurang mampu mempertahankan perhatian.",
    correctAnswer: "BENAR",
    explanation: "Durasi tonton dan retensi dapat menjadi sinyal kemampuan konten mempertahankan perhatian."
  },
  {
    id: 15,
    question: "Like dan komentar tidak memiliki hubungan sama sekali dengan cara algoritma menilai sebuah konten.",
    correctAnswer: "SALAH",
    explanation: "Like dan komentar merupakan bentuk engagement yang dapat menjadi sinyal bagi sistem rekomendasi."
  },
  {
    id: 16,
    question: "Share dapat menjadi salah satu bentuk engagement yang menunjukkan bahwa pengguna merasa konten layak dibagikan.",
    correctAnswer: "BENAR",
    explanation: "Tindakan membagikan konten merupakan interaksi yang dapat menjadi sinyal ketertarikan atau relevansi."
  },
  {
    id: 17,
    question: "Save pada Instagram dapat menunjukkan bahwa pengguna menganggap suatu konten cukup berguna atau menarik untuk disimpan.",
    correctAnswer: "BENAR",
    explanation: "Fitur simpan merupakan bentuk interaksi yang dapat memberi sinyal tentang nilai konten bagi pengguna."
  },
  {
    id: 18,
    question: "Semua pengguna akan menerima susunan konten yang sama karena algoritma media sosial bekerja dengan aturan yang identik untuk setiap orang.",
    correctAnswer: "SALAH",
    explanation: "Algoritma dapat menyesuaikan rekomendasi berdasarkan perilaku dan minat masing-masing pengguna."
  },
  {
    id: 19,
    question: "Pada YouTube, video yang memiliki CTR tinggi tetapi penonton segera meninggalkannya tetap perlu memperhatikan masalah retensi penonton.",
    correctAnswer: "BENAR",
    explanation: "CTR menunjukkan keberhasilan menarik klik, sedangkan retensi menunjukkan kemampuan mempertahankan penonton setelah klik."
  },
  {
    id: 20,
    question: "Thumbnail yang menarik dapat membantu meningkatkan kemungkinan pengguna mengklik video, tetapi tidak menjamin penonton akan menonton sampai selesai.",
    correctAnswer: "BENAR",
    explanation: "Thumbnail dapat memengaruhi keputusan klik, sedangkan isi video berpengaruh terhadap retensi."
  },
  {
    id: 21,
    question: "Recency berarti keterkinian atau seberapa baru sebuah unggahan.",
    correctAnswer: "BENAR",
    explanation: "Recency berkaitan dengan waktu atau keterkinian konten."
  },
  {
    id: 22,
    question: "Pada platform X, konten lama selalu lebih diutamakan daripada konten baru karena algoritma mengabaikan waktu unggah.",
    correctAnswer: "SALAH",
    explanation: "Keterkinian merupakan salah satu faktor yang dapat memengaruhi visibilitas konten di X."
  },
  {
    id: 23,
    question: "Mengunggah konten tanpa memperhatikan target pengguna tetap menjamin konten akan menjangkau audiens yang tepat.",
    correctAnswer: "SALAH",
    explanation: "Pemahaman target pengguna membantu marketer membuat konten yang lebih relevan dengan kebutuhan dan minat audiens."
  },
  {
    id: 24,
    question: "Strategi digital marketing dapat memanfaatkan pemahaman algoritma untuk memilih format konten yang sesuai.",
    correctAnswer: "BENAR",
    explanation: "Pemahaman terhadap sinyal algoritma dapat membantu marketer menyesuaikan format dan strategi konten."
  },
  {
    id: 25,
    question: "Konten yang relevan dengan minat pengguna memiliki peluang lebih besar untuk diperhatikan pengguna.",
    correctAnswer: "BENAR",
    explanation: "Relevansi dengan minat pengguna merupakan salah satu prinsip penting dalam sistem rekomendasi."
  },
  {
    id: 26,
    question: "Algoritma hanya bekerja ketika pengguna membuka aplikasi untuk pertama kali.",
    correctAnswer: "SALAH",
    explanation: "Algoritma terus memproses berbagai sinyal interaksi dan perilaku pengguna."
  },
  {
    id: 27,
    question: "Perubahan perilaku pengguna dapat menyebabkan rekomendasi konten yang diterima pengguna ikut berubah.",
    correctAnswer: "BENAR",
    explanation: "Jika minat atau pola interaksi berubah, sistem rekomendasi dapat menyesuaikan konten yang ditampilkan."
  },
  {
    id: 28,
    question: "Jika seseorang sering menonton konten tentang memasak, sistem dapat menggunakan kebiasaan tersebut sebagai salah satu sinyal untuk memberikan rekomendasi yang berkaitan dengan memasak.",
    correctAnswer: "BENAR",
    explanation: "Riwayat tontonan dapat menjadi sinyal minat sehingga konten serupa berpeluang lebih sering direkomendasikan."
  },
  {
    id: 29,
    question: "Semua konten yang mendapatkan banyak komentar pasti memiliki kualitas yang baik menurut algoritma.",
    correctAnswer: "SALAH",
    explanation: "Jumlah komentar saja tidak cukup; jenis interaksi dan sinyal lainnya juga dapat diperhitungkan."
  },
  {
    id: 30,
    question: "Interaksi negatif seperti menyembunyikan atau melaporkan konten dapat menjadi sinyal yang memengaruhi distribusi konten.",
    correctAnswer: "BENAR",
    explanation: "Sinyal negatif dapat menunjukkan bahwa konten tidak sesuai atau tidak diinginkan sehingga dapat memengaruhi jangkauannya."
  },
  {
    id: 31,
    question: "Memahami algoritma berarti mencari cara untuk menipu sistem agar semua konten menjadi viral.",
    correctAnswer: "SALAH",
    explanation: "Memahami algoritma lebih tepat digunakan untuk membuat konten relevan dan menyusun strategi pemasaran yang efektif."
  },
  {
    id: 32,
    question: "Waktu posting dapat dipertimbangkan dalam strategi konten, terutama ketika audiens lebih aktif pada waktu tertentu.",
    correctAnswer: "BENAR",
    explanation: "Menyesuaikan waktu publikasi dengan kebiasaan audiens dapat membantu peluang memperoleh interaksi awal."
  },
  {
    id: 33,
    question: "Facebook dapat mempertimbangkan interaksi bermakna dari koneksi pribadi dalam penyusunan konten yang tampil kepada pengguna.",
    correctAnswer: "BENAR",
    explanation: "Naskah awal menjelaskan bahwa Facebook secara umum memprioritaskan interaksi bermakna dari teman dan keluarga dibandingkan konten Page bisnis."
  },
  {
    id: 34,
    question: "Konten dari halaman bisnis di Facebook pasti selalu tampil di bagian atas beranda semua pengikutnya.",
    correctAnswer: "SALAH",
    explanation: "Jumlah pengikut tidak menjamin semua konten selalu tampil di posisi atas karena algoritma melakukan penyaringan."
  },
  {
    id: 35,
    question: "Algoritma dapat membantu pengguna menemukan konten yang belum pernah mereka cari secara langsung.",
    correctAnswer: "BENAR",
    explanation: "Sistem rekomendasi dapat menggunakan pola perilaku dan minat untuk menyarankan konten yang dianggap relevan."
  },
  {
    id: 36,
    question: "Seorang marketer melihat video memiliki banyak klik tetapi durasi tonton sangat rendah. Data tersebut dapat menjadi alasan untuk mengevaluasi isi video.",
    correctAnswer: "BENAR",
    explanation: "Klik tinggi tetapi retensi rendah menunjukkan bahwa keberhasilan menarik klik belum tentu diikuti kemampuan mempertahankan penonton."
  },
  {
    id: 37,
    question: "Jika sebuah konten memperoleh banyak share, marketer tidak perlu lagi mengevaluasi relevansi konten terhadap target audiens.",
    correctAnswer: "SALAH",
    explanation: "Share merupakan sinyal interaksi, tetapi evaluasi tetap diperlukan agar strategi sesuai tujuan dan target audiens."
  },
  {
    id: 38,
    question: "Perbedaan kebiasaan pengguna dapat menyebabkan dua orang melihat rekomendasi konten yang berbeda pada platform yang sama.",
    correctAnswer: "BENAR",
    explanation: "Algoritma dapat mempersonalisasi rekomendasi berdasarkan riwayat perilaku dan minat masing-masing pengguna."
  },
  {
    id: 39,
    question: "Algoritma digital marketing tidak perlu dipahami oleh marketer karena keberhasilan pemasaran hanya ditentukan oleh jumlah followers.",
    correctAnswer: "SALAH",
    explanation: "Pemahaman algoritma membantu marketer mengoptimalkan waktu posting, format konten, dan strategi engagement."
  },
  {
    id: 40,
    question: "Memahami algoritma sebaiknya digunakan untuk meningkatkan relevansi dan kualitas strategi konten, bukan sekadar mengejar jumlah interaksi.",
    correctAnswer: "BENAR",
    explanation: "Pemahaman algoritma membantu menyusun konten yang lebih relevan dan tepat sasaran serta mengoptimalkan strategi engagement."
  }
];
