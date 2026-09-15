import AdminDashboard from "./pages/AdminDashboard.jsx";

// Untuk tahap awal, App langsung menampilkan Dashboard Admin.
// Nanti kalau Dashboard Customer & Dashboard Pemilik Mobil sudah dibuat,
// bagian ini diganti pakai router (mis. react-router-dom) untuk memisahkan
// /admin, /pemilik, dan /customer.
export default function App() {
  return <AdminDashboard />;
}
