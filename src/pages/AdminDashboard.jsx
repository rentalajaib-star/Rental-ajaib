import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Settings2,
  Car,
  Wallet,
  Users2,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Pencil,
  Search,
  MapPin,
  TrendingUp,
  Wrench,
  KeyRound,
  X,
  Check,
  Banknote,
  UserCog,
  Menu,
} from "lucide-react";

// ---------- Mock data awal (nanti diganti data Firebase) ----------
const initialMobil = [
  { id: 1, nama: "Avanza", merek: "Toyota", tipe: "MPV", noPolisi: "B 1234 XYZ", warna: "Silver", km: 45000, hargaPerHari: 350000, pemilikId: 1, persenPemilik: 70, status: "tersedia" },
  { id: 2, nama: "Brio", merek: "Honda", tipe: "Hatchback", noPolisi: "B 5678 ABC", warna: "Putih", km: 22000, hargaPerHari: 250000, pemilikId: 2, persenPemilik: 65, status: "disewa" },
  { id: 3, nama: "Xenia", merek: "Daihatsu", tipe: "MPV", noPolisi: "B 9012 DEF", warna: "Hitam", km: 61000, hargaPerHari: 320000, pemilikId: 1, persenPemilik: 70, status: "tersedia" },
  { id: 4, nama: "Xpander", merek: "Mitsubishi", tipe: "MPV", noPolisi: "B 3456 GHI", warna: "Merah", km: 15000, hargaPerHari: 380000, pemilikId: 3, persenPemilik: 75, status: "perawatan" },
];

const initialPemilik = [
  { id: 1, nama: "Herman Saputra", email: "herman@mail.com", nik: "3201000000000001", password: "" },
  { id: 2, nama: "Siti Nurhaliza", email: "siti@mail.com", nik: "3202000000000002", password: "" },
  { id: 3, nama: "Rudi Hartono", email: "rudi@mail.com", nik: "3203000000000003", password: "" },
];

const initialBiaya = [
  { id: 1, nama: "Listrik", jumlah: 800000 },
  { id: 2, nama: "Gaji Karyawan", jumlah: 4500000 },
  { id: 3, nama: "Biaya Aplikasi", jumlah: 300000 },
];

const initialCustomer = [
  { id: 1, nik: "3273000000000011", nama: "Andi Wijaya", alamat: "Jl. Merdeka No. 10, Bandung" },
  { id: 2, nik: "3274000000000012", nama: "Rina Kartika", alamat: "Jl. Sudirman No. 5, Bandung" },
];

const initialTransaksi = [
  { id: 1, mobilId: 2, customerId: 2, tujuan: "Lembang", mulai: "2026-09-08", selesai: "2026-09-10", hari: 2, total: 500000, biayaPerawatan: 50000 },
  { id: 2, mobilId: 1, customerId: 1, tujuan: "Bandara Husein", mulai: "2026-09-05", selesai: "2026-09-06", hari: 1, total: 350000, biayaPerawatan: 0 },
];

const rupiah = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

const statusStyle = {
  tersedia: { bg: "#E7F7EF", fg: "#12894A", label: "Tersedia" },
  disewa: { bg: "#FFF1E6", fg: "#C8570E", label: "Disewa" },
  perawatan: { bg: "#FDECEC", fg: "#D93636", label: "Perawatan" },
};

const menuList = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    key: "setup",
    label: "Setup",
    icon: Settings2,
    children: [
      { key: "setup-mobil", label: "Mobil", icon: Car },
      { key: "setup-biaya", label: "Biaya Rental", icon: Wallet },
      { key: "setup-akun", label: "Akun Pemilik", icon: UserCog },
    ],
  },
  { key: "kasir", label: "Kasir", icon: Users2 },
  { key: "pendapatan", label: "Pendapatan", icon: TrendingUp },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [setupOpen, setSetupOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goTo = (key) => {
    setActive(key);
    setSidebarOpen(false);
  };

  const [mobilList, setMobilList] = useState(initialMobil);
  const [pemilikList, setPemilikList] = useState(initialPemilik);
  const [biayaList, setBiayaList] = useState(initialBiaya);
  const [customerList, setCustomerList] = useState(initialCustomer);
  const [transaksiList, setTransaksiList] = useState(initialTransaksi);

  const pageTitle = useMemo(() => {
    for (const m of menuList) {
      if (m.key === active) return m.label;
      if (m.children) {
        const c = m.children.find((c) => c.key === active);
        if (c) return `Setup — ${c.label}`;
      }
    }
    return "";
  }, [active]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="w-full min-h-screen flex bg-[#F5F7FB] text-[#101A33]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #D7DEEC; border-radius: 8px; }
      `}</style>

      {/* OVERLAY (mobile, saat sidebar dibuka) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(8,14,28,0.5)" }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`w-[240px] shrink-0 flex flex-col fixed inset-y-0 left-0 z-40 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0C1F3F" }}
      >
        <div className="px-5 pt-6 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#1657E0" }}>
              <Car size={18} color="#fff" />
            </div>
            <div>
              <div className="text-white font-extrabold text-[15px] leading-none tracking-tight">Rental Ajaib</div>
              <div className="text-[11px] mt-1" style={{ color: "#7C8CB3" }}>Panel Admin</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ color: "#8FA0C6" }}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 pt-2 space-y-1 overflow-y-auto">
          {menuList.map((m) => {
            const Icon = m.icon;
            const isParentActive = active === m.key || (m.children && m.children.some((c) => c.key === active));
            if (!m.children) {
              return (
                <button
                  key={m.key}
                  onClick={() => goTo(m.key)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-colors"
                  style={{
                    background: active === m.key ? "#1657E0" : "transparent",
                    color: active === m.key ? "#fff" : "#B7C2DE",
                  }}
                >
                  <Icon size={17} />
                  {m.label}
                </button>
              );
            }
            return (
              <div key={m.key}>
                <button
                  onClick={() => setSetupOpen((v) => !v)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-medium"
                  style={{ color: isParentActive ? "#fff" : "#B7C2DE" }}
                >
                  <Icon size={17} />
                  <span className="flex-1 text-left">{m.label}</span>
                  {setupOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                {setupOpen && (
                  <div className="ml-4 pl-4 mt-0.5 mb-1 space-y-0.5" style={{ borderLeft: "1px solid #1E3560" }}>
                    {m.children.map((c) => {
                      const CIcon = c.icon;
                      return (
                        <button
                          key={c.key}
                          onClick={() => goTo(c.key)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium"
                          style={{
                            background: active === c.key ? "#15305F" : "transparent",
                            color: active === c.key ? "#fff" : "#8FA0C6",
                          }}
                        >
                          <CIcon size={15} />
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-4 pb-5 pt-3 shrink-0" style={{ borderTop: "1px solid #16294D" }}>
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: "#28407A" }}>A</div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-white leading-none">Admin</div>
              <div className="text-[11px] mt-1 truncate" style={{ color: "#7C8CB3" }}>admin@rentalajaib.id</div>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 md:h-16 shrink-0 flex items-center justify-between gap-3 px-4 md:px-8" style={{ background: "#fff", borderBottom: "1px solid #E7EBF3" }}>
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#F1F3F8", color: "#3E4B63" }}>
              <Menu size={17} />
            </button>
            <div className="text-[15px] md:text-[17px] font-bold truncate">{pageTitle}</div>
          </div>
          <div className="hidden sm:block text-[13px] shrink-0" style={{ color: "#7C879E" }}>
            {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {active === "dashboard" && <DashboardView mobilList={mobilList} transaksiList={transaksiList} biayaList={biayaList} pemilikList={pemilikList} />}
          {active === "setup-mobil" && <SetupMobilView mobilList={mobilList} setMobilList={setMobilList} pemilikList={pemilikList} />}
          {active === "setup-biaya" && <SetupBiayaView biayaList={biayaList} setBiayaList={setBiayaList} />}
          {active === "setup-akun" && <SetupAkunView pemilikList={pemilikList} setPemilikList={setPemilikList} mobilList={mobilList} setMobilList={setMobilList} />}
          {active === "kasir" && (
            <KasirView
              mobilList={mobilList}
              setMobilList={setMobilList}
              customerList={customerList}
              setCustomerList={setCustomerList}
              setTransaksiList={setTransaksiList}
            />
          )}
          {active === "pendapatan" && (
            <PendapatanView mobilList={mobilList} transaksiList={transaksiList} biayaList={biayaList} pemilikList={pemilikList} />
          )}
        </div>
      </main>
    </div>
  );
}

// ---------- Card kecil pembungkus konsisten ----------
function Card({ title, right, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-5 ${className}`} style={{ border: "1px solid #E7EBF3" }}>
      {(title || right) && (
        <div className="flex items-center justify-between mb-4">
          {title && <div className="text-[14px] font-bold">{title}</div>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

// ---------- DASHBOARD ----------
function DashboardView({ mobilList, transaksiList, biayaList, pemilikList }) {
  const bulanIni = new Date().getMonth();
  const transaksiBulanIni = transaksiList.filter((t) => new Date(t.mulai).getMonth() === bulanIni);
  const totalSewa = transaksiBulanIni.reduce((a, t) => a + t.total, 0);
  const totalPerawatan = transaksiBulanIni.reduce((a, t) => a + t.biayaPerawatan, 0);
  const totalDibagi = totalSewa - totalPerawatan;
  const totalPemilik = transaksiBulanIni.reduce((a, t) => {
    const mobil = mobilList.find((m) => m.id === t.mobilId);
    if (!mobil) return a;
    return a + (t.total - t.biayaPerawatan) * (mobil.persenPemilik / 100);
  }, 0);
  const pendapatanRental = totalDibagi - totalPemilik;
  const totalBiayaFix = biayaList.reduce((a, b) => a + b.jumlah, 0);
  const pendapatanBersih = pendapatanRental - totalBiayaFix;

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-[13px]" style={{ color: "#7C879E" }}>Pendapatan Bersih Bulan Ini</div>
        <div className="text-[34px] font-extrabold mt-1" style={{ color: pendapatanBersih >= 0 ? "#12894A" : "#D93636" }}>
          {rupiah(pendapatanBersih)}
        </div>
        <div className="text-[12.5px] mt-1" style={{ color: "#9AA5BD" }}>Total saja — rincian lengkap ada di menu Pendapatan</div>
      </Card>

      <Card title="Daftar Mobil & Status">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mobilList.map((m) => {
            const s = statusStyle[m.status];
            const pemilik = pemilikList.find((p) => p.id === m.pemilikId);
            return (
              <div key={m.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
                <div>
                  <div className="text-[14px] font-semibold">{m.merek} {m.nama}</div>
                  <div className="text-[12px]" style={{ color: "#8992A6" }}>{m.noPolisi} · Pemilik: {pemilik?.nama || "-"}</div>
                </div>
                <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.fg }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Lokasi Mobil">
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2" style={{ color: "#9AA5BD" }}>
          <MapPin size={28} />
          <div className="text-[13.5px]">Fitur pelacakan lokasi mobil akan hadir menyusul.</div>
        </div>
      </Card>
    </div>
  );
}

// ---------- SETUP: MOBIL ----------
function SetupMobilView({ mobilList, setMobilList, pemilikList }) {
  const emptyForm = { nama: "", merek: "", tipe: "", noPolisi: "", warna: "", km: "", hargaPerHari: "", pemilikId: "", persenPemilik: "" };
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [pwPromptId, setPwPromptId] = useState(null); // id mobil yang minta konfirmasi kata sandi
  const [pwInput, setPwInput] = useState("");
  const [pwAction, setPwAction] = useState(null); // 'edit' | 'hapus'
  const [pwError, setPwError] = useState("");
  const ADMIN_PASSWORD = "admin123"; // demo saja — nanti diganti verifikasi Firebase Auth

  const submit = () => {
    if (!form.nama || !form.hargaPerHari) return;
    if (editId) {
      setMobilList((list) => list.map((m) => (m.id === editId ? { ...m, ...form, km: Number(form.km), hargaPerHari: Number(form.hargaPerHari), persenPemilik: Number(form.persenPemilik), pemilikId: Number(form.pemilikId) } : m)));
      setEditId(null);
    } else {
      setMobilList((list) => [
        ...list,
        { id: Date.now(), ...form, km: Number(form.km), hargaPerHari: Number(form.hargaPerHari), persenPemilik: Number(form.persenPemilik), pemilikId: Number(form.pemilikId), status: "tersedia" },
      ]);
    }
    setForm(emptyForm);
  };

  const requestPassword = (id, action) => {
    setPwPromptId(id);
    setPwAction(action);
    setPwInput("");
    setPwError("");
  };

  const confirmPassword = () => {
    if (pwInput !== ADMIN_PASSWORD) {
      setPwError("Kata sandi salah");
      return;
    }
    const mobil = mobilList.find((m) => m.id === pwPromptId);
    if (pwAction === "hapus") {
      setMobilList((list) => list.filter((m) => m.id !== pwPromptId));
    } else if (pwAction === "edit" && mobil) {
      setForm({ ...mobil, pemilikId: String(mobil.pemilikId) });
      setEditId(mobil.id);
    }
    setPwPromptId(null);
  };

  return (
    <div className="space-y-6">
      <Card title={editId ? "Edit Data Mobil" : "Input Data Mobil"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Field label="Nama Mobil" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Avanza" />
          <Field label="Merek" value={form.merek} onChange={(v) => setForm({ ...form, merek: v })} placeholder="Toyota" />
          <Field label="Tipe" value={form.tipe} onChange={(v) => setForm({ ...form, tipe: v })} placeholder="MPV" />
          <Field label="No. Polisi" value={form.noPolisi} onChange={(v) => setForm({ ...form, noPolisi: v })} placeholder="B 1234 XYZ" />
          <Field label="Warna" value={form.warna} onChange={(v) => setForm({ ...form, warna: v })} placeholder="Silver" />
          <Field label="KM" value={form.km} onChange={(v) => setForm({ ...form, km: v })} type="number" placeholder="45000" />
          <Field label="Harga Sewa / Hari" value={form.hargaPerHari} onChange={(v) => setForm({ ...form, hargaPerHari: v })} type="number" placeholder="350000" />
          <SelectField
            label="Pemilik Mobil"
            value={form.pemilikId}
            onChange={(v) => setForm({ ...form, pemilikId: v })}
            options={pemilikList.map((p) => ({ value: String(p.id), label: p.nama }))}
          />
          <Field label="Persentase Pemilik (%)" value={form.persenPemilik} onChange={(v) => setForm({ ...form, persenPemilik: v })} type="number" placeholder="70" />
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={submit} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold flex items-center gap-2" style={{ background: "#1657E0" }}>
            <Plus size={15} /> {editId ? "Simpan Perubahan" : "Tambah Mobil"}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setForm(emptyForm); }} className="px-4 py-2.5 rounded-xl text-[13.5px] font-semibold" style={{ background: "#F1F3F8", color: "#5B6579" }}>
              Batal
            </button>
          )}
        </div>
      </Card>

      <Card title="Daftar Mobil yang Sudah Diinput">
        <div className="space-y-2">
          {mobilList.map((m) => {
            const pemilik = pemilikList.find((p) => p.id === m.pemilikId);
            return (
              <div key={m.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
                <div>
                  <div className="text-[14px] font-semibold">{m.merek} {m.nama} · {m.noPolisi}</div>
                  <div className="text-[12px]" style={{ color: "#8992A6" }}>
                    {rupiah(m.hargaPerHari)}/hari · Pemilik {pemilik?.nama || "-"} ({m.persenPemilik}%)
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => requestPassword(m.id, "edit")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#EAF1FF", color: "#1657E0" }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => requestPassword(m.id, "hapus")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FDECEC", color: "#D93636" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {pwPromptId && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(12,20,40,0.45)" }}>
          <div className="bg-white rounded-2xl p-6 w-[340px]">
            <div className="flex items-center gap-2 mb-1"><KeyRound size={16} color="#1657E0" /><div className="text-[14px] font-bold">Konfirmasi Kata Sandi</div></div>
            <div className="text-[12.5px] mb-3" style={{ color: "#8992A6" }}>Masukkan kata sandi admin untuk {pwAction === "hapus" ? "menghapus" : "mengubah"} data mobil ini.</div>
            <input type="password" value={pwInput} onChange={(e) => setPwInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px]" style={{ border: "1px solid #DFE4EE" }} placeholder="Kata sandi" />
            {pwError && <div className="text-[12px] mt-1.5" style={{ color: "#D93636" }}>{pwError}</div>}
            <div className="flex gap-2 mt-4">
              <button onClick={confirmPassword} className="flex-1 py-2.5 rounded-xl text-white text-[13.5px] font-semibold" style={{ background: "#1657E0" }}>Konfirmasi</button>
              <button onClick={() => setPwPromptId(null)} className="flex-1 py-2.5 rounded-xl text-[13.5px] font-semibold" style={{ background: "#F1F3F8", color: "#5B6579" }}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- SETUP: BIAYA ----------
function SetupBiayaView({ biayaList, setBiayaList }) {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const total = biayaList.reduce((a, b) => a + b.jumlah, 0);

  const tambah = () => {
    if (!nama || !jumlah) return;
    setBiayaList((l) => [...l, { id: Date.now(), nama, jumlah: Number(jumlah) }]);
    setNama("");
    setJumlah("");
  };

  return (
    <div className="space-y-6">
      <Card title="Biaya Fix Cost Rental (Per Bulan)" right={<div className="text-[13px] font-bold" style={{ color: "#1657E0" }}>Total: {rupiah(total)}</div>}>
        <div className="space-y-2 mb-4">
          {biayaList.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
              <div className="text-[14px] font-medium">{b.nama}</div>
              <div className="flex items-center gap-3">
                <div className="text-[14px] font-semibold">{rupiah(b.jumlah)}</div>
                <button onClick={() => setBiayaList((l) => l.filter((x) => x.id !== b.id))} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FDECEC", color: "#D93636" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama biaya (mis. Internet)" className="flex-1 px-3.5 py-2.5 rounded-xl text-[13.5px]" style={{ border: "1px solid #DFE4EE" }} />
          <input value={jumlah} onChange={(e) => setJumlah(e.target.value)} type="number" placeholder="Jumlah" className="w-40 px-3.5 py-2.5 rounded-xl text-[13.5px]" style={{ border: "1px solid #DFE4EE" }} />
          <button onClick={tambah} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold flex items-center gap-2" style={{ background: "#1657E0" }}>
            <Plus size={15} /> Tambah
          </button>
        </div>
      </Card>
    </div>
  );
}

// ---------- SETUP: AKUN PEMILIK ----------
function SetupAkunView({ pemilikList, setPemilikList, mobilList, setMobilList }) {
  const [form, setForm] = useState({ nama: "", email: "", nik: "", password: "" });

  const tambah = () => {
    if (!form.nama || !form.email) return;
    setPemilikList((l) => [...l, { id: Date.now(), ...form }]);
    setForm({ nama: "", email: "", nik: "", password: "" });
  };

  return (
    <div className="space-y-6">
      <Card title="Input Akun Pemilik Mobil">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Nama" value={form.nama} onChange={(v) => setForm({ ...form, nama: v })} placeholder="Herman Saputra" />
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="herman@mail.com" />
          <Field label="NIK" value={form.nik} onChange={(v) => setForm({ ...form, nik: v })} placeholder="3201xxxxxxxxxxxx" />
          <Field label="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} type="password" placeholder="Untuk login dashboard pemilik" />
        </div>
        <div className="text-[12px] mt-3 px-3.5 py-2.5 rounded-xl" style={{ background: "#EAF1FF", color: "#1657E0" }}>
          Password ini dipakai pemilik mobil untuk masuk ke dashboard-nya sendiri, memantau mobil dan pendapatan.
        </div>
        <button onClick={tambah} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold flex items-center gap-2 mt-4" style={{ background: "#1657E0" }}>
          <Plus size={15} /> Tambah Akun
        </button>
      </Card>

      <Card title="Daftar Akun Pemilik">
        <div className="space-y-3">
          {pemilikList.map((p) => {
            const mobilPunya = mobilList.filter((m) => m.pemilikId === p.id);
            return (
              <div key={p.id} className="px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
                <div className="text-[14px] font-semibold">{p.nama}</div>
                <div className="text-[12px] mb-2" style={{ color: "#8992A6" }}>{p.email}</div>
                {mobilPunya.length === 0 ? (
                  <div className="text-[12px]" style={{ color: "#B3BBCB" }}>Belum ada mobil terhubung</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mobilPunya.map((m) => (
                      <span key={m.id} className="text-[11.5px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#EAF1FF", color: "#1657E0" }}>
                        {m.merek} {m.nama} · {m.persenPemilik}%
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ---------- KASIR ----------
function KasirView({ mobilList, setMobilList, customerList, setCustomerList, setTransaksiList }) {
  const [step, setStep] = useState("customer"); // customer -> mobil -> sewa -> konfirmasi -> selesai
  const [search, setSearch] = useState("");
  const [customerBaru, setCustomerBaru] = useState({ nik: "", nama: "", alamat: "" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMobilId, setSelectedMobilId] = useState(null);
  const [tujuan, setTujuan] = useState("");
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");

  const hasilCari = customerList.filter((c) => c.nama.toLowerCase().includes(search.toLowerCase()) || c.nik.includes(search));
  const mobilTersedia = mobilList.filter((m) => m.status === "tersedia");
  const mobil = mobilList.find((m) => m.id === selectedMobilId);

  const hari = mulai && selesai ? Math.max(1, Math.round((new Date(selesai) - new Date(mulai)) / 86400000)) : 0;
  const total = mobil ? hari * mobil.hargaPerHari : 0;

  const pilihCustomerBaru = () => {
    if (!customerBaru.nama || !customerBaru.nik) return;
    const c = { id: Date.now(), ...customerBaru };
    setCustomerList((l) => [...l, c]);
    setSelectedCustomer(c);
    setStep("mobil");
  };

  const konfirmasiPesanan = () => {
    setTransaksiList((l) => [...l, { id: Date.now(), mobilId: mobil.id, customerId: selectedCustomer.id, tujuan, mulai, selesai, hari, total, biayaPerawatan: 0 }]);
    setMobilList((l) => l.map((m) => (m.id === mobil.id ? { ...m, status: "disewa" } : m)));
    setStep("selesai");
  };

  const reset = () => {
    setStep("customer");
    setSearch("");
    setCustomerBaru({ nik: "", nama: "", alamat: "" });
    setSelectedCustomer(null);
    setSelectedMobilId(null);
    setTujuan("");
    setMulai("");
    setSelesai("");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <StepBar step={step} />

      {step === "customer" && (
        <Card title="Data Customer">
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color="#9AA5BD" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau NIK customer terdaftar..." className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-[13.5px]" style={{ border: "1px solid #DFE4EE" }} />
          </div>
          {search && (
            <div className="space-y-2 mb-4">
              {hasilCari.length === 0 && <div className="text-[12.5px]" style={{ color: "#9AA5BD" }}>Tidak ditemukan — isi form di bawah untuk customer baru.</div>}
              {hasilCari.map((c) => (
                <button key={c.id} onClick={() => { setSelectedCustomer(c); setStep("mobil"); }} className="w-full text-left px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
                  <div className="text-[14px] font-semibold">{c.nama}</div>
                  <div className="text-[12px]" style={{ color: "#8992A6" }}>{c.nik} · {c.alamat}</div>
                </button>
              ))}
            </div>
          )}
          <div className="text-[12px] font-semibold mb-2" style={{ color: "#8992A6" }}>ATAU DAFTARKAN CUSTOMER BARU</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="NIK" value={customerBaru.nik} onChange={(v) => setCustomerBaru({ ...customerBaru, nik: v })} />
            <Field label="Nama" value={customerBaru.nama} onChange={(v) => setCustomerBaru({ ...customerBaru, nama: v })} />
            <div className="col-span-2"><Field label="Alamat" value={customerBaru.alamat} onChange={(v) => setCustomerBaru({ ...customerBaru, alamat: v })} /></div>
          </div>
          <button onClick={pilihCustomerBaru} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold mt-4" style={{ background: "#1657E0" }}>Lanjut Pilih Mobil</button>
        </Card>
      )}

      {step === "mobil" && (
        <Card title={`Pilih Mobil untuk ${selectedCustomer?.nama}`}>
          <div className="space-y-2 mb-4">
            {mobilTersedia.map((m) => (
              <button key={m.id} onClick={() => { setSelectedMobilId(m.id); setStep("sewa"); }} className="w-full flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "#F7F9FC" }}>
                <div className="text-left">
                  <div className="text-[14px] font-semibold">{m.merek} {m.nama}</div>
                  <div className="text-[12px]" style={{ color: "#8992A6" }}>{m.noPolisi} · {m.warna}</div>
                </div>
                <div className="text-[14px] font-bold" style={{ color: "#1657E0" }}>{rupiah(m.hargaPerHari)}/hari</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("customer")} className="text-[13px] font-semibold" style={{ color: "#8992A6" }}>← Kembali</button>
        </Card>
      )}

      {step === "sewa" && mobil && (
        <Card title="Detail Sewa">
          <Field label="Tujuan" value={tujuan} onChange={setTujuan} placeholder="Lembang, dsb." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <Field label="Tanggal Mulai" value={mulai} onChange={setMulai} type="date" />
            <Field label="Tanggal Selesai" value={selesai} onChange={setSelesai} type="date" />
          </div>
          {hari > 0 && (
            <div className="mt-4 p-4 rounded-xl" style={{ background: "#EAF1FF" }}>
              <div className="flex justify-between text-[13px] mb-1"><span>Lama sewa</span><span className="font-semibold">{hari} hari (24 jam)</span></div>
              <div className="flex justify-between text-[13px] mb-1"><span>Harga / hari</span><span className="font-semibold">{rupiah(mobil.hargaPerHari)}</span></div>
              <div className="flex justify-between text-[15px] pt-2 mt-1 font-bold" style={{ borderTop: "1px dashed #B9D0FA" }}><span>Total Pembayaran</span><span style={{ color: "#1657E0" }}>{rupiah(total)}</span></div>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button disabled={!tujuan || !hari} onClick={() => setStep("konfirmasi")} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold disabled:opacity-40" style={{ background: "#1657E0" }}>Lanjut Konfirmasi</button>
            <button onClick={() => setStep("mobil")} className="px-4 py-2.5 rounded-xl text-[13.5px] font-semibold" style={{ background: "#F1F3F8", color: "#5B6579" }}>Kembali</button>
          </div>
        </Card>
      )}

      {step === "konfirmasi" && mobil && (
        <Card title="Konfirmasi Pesanan">
          <div className="text-[15px] font-semibold mb-4">Dengan pesanan ini, yakin?</div>
          <div className="space-y-1.5 text-[13.5px] mb-4">
            <div className="flex justify-between"><span style={{ color: "#8992A6" }}>Customer</span><span className="font-medium">{selectedCustomer?.nama}</span></div>
            <div className="flex justify-between"><span style={{ color: "#8992A6" }}>Mobil</span><span className="font-medium">{mobil.merek} {mobil.nama}</span></div>
            <div className="flex justify-between"><span style={{ color: "#8992A6" }}>Tujuan</span><span className="font-medium">{tujuan}</span></div>
            <div className="flex justify-between"><span style={{ color: "#8992A6" }}>Tanggal</span><span className="font-medium">{mulai} s/d {selesai}</span></div>
            <div className="flex justify-between text-[15px] pt-2 font-bold"><span>Total</span><span style={{ color: "#1657E0" }}>{rupiah(total)}</span></div>
          </div>
          <div className="flex gap-2">
            <button onClick={konfirmasiPesanan} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold flex items-center gap-2" style={{ background: "#12894A" }}><Check size={15} /> Ya, Konfirmasi</button>
            <button onClick={() => setStep("sewa")} className="px-4 py-2.5 rounded-xl text-[13.5px] font-semibold" style={{ background: "#F1F3F8", color: "#5B6579" }}>Batal</button>
          </div>
        </Card>
      )}

      {step === "selesai" && (
        <Card>
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#E7F7EF" }}><Check size={26} color="#12894A" /></div>
            <div className="text-[16px] font-bold">Pesanan Berhasil Dibuat</div>
            <div className="text-[13px]" style={{ color: "#8992A6" }}>Status mobil sudah otomatis diperbarui menjadi "Disewa".</div>
            <button onClick={reset} className="px-4 py-2.5 rounded-xl text-white text-[13.5px] font-semibold mt-2" style={{ background: "#1657E0" }}>Transaksi Baru</button>
          </div>
        </Card>
      )}
    </div>
  );
}

function StepBar({ step }) {
  const steps = [
    { key: "customer", label: "Customer" },
    { key: "mobil", label: "Pilih Mobil" },
    { key: "sewa", label: "Detail Sewa" },
    { key: "konfirmasi", label: "Konfirmasi" },
  ];
  const idx = Math.max(0, steps.findIndex((s) => s.key === step));
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: i <= idx ? "#1657E0" : "#E7EBF3", color: i <= idx ? "#fff" : "#9AA5BD" }}>{i + 1}</div>
            <div className="text-[12.5px] font-semibold" style={{ color: i <= idx ? "#101A33" : "#9AA5BD" }}>{s.label}</div>
          </div>
          {i < steps.length - 1 && <div className="w-8 h-px mx-2" style={{ background: "#E7EBF3" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------- PENDAPATAN ----------
function PendapatanView({ mobilList, transaksiList, biayaList, pemilikList }) {
  const [openSewa, setOpenSewa] = useState(false);
  const [openPerawatan, setOpenPerawatan] = useState(false);

  const perMobilSewa = mobilList.map((m) => ({
    mobil: m,
    total: transaksiList.filter((t) => t.mobilId === m.id).reduce((a, t) => a + t.total, 0),
  }));
  const perMobilPerawatan = mobilList.map((m) => ({
    mobil: m,
    total: transaksiList.filter((t) => t.mobilId === m.id).reduce((a, t) => a + t.biayaPerawatan, 0),
  }));

  const totalSewa = perMobilSewa.reduce((a, x) => a + x.total, 0);
  const totalPerawatan = perMobilPerawatan.reduce((a, x) => a + x.total, 0);
  const totalDibagi = totalSewa - totalPerawatan;

  const totalPemilik = transaksiList.reduce((a, t) => {
    const m = mobilList.find((m) => m.id === t.mobilId);
    if (!m) return a;
    return a + (t.total - t.biayaPerawatan) * (m.persenPemilik / 100);
  }, 0);

  const pendapatanRental = totalDibagi - totalPemilik;
  const totalBiayaFix = biayaList.reduce((a, b) => a + b.jumlah, 0);
  const pendapatanBersih = pendapatanRental - totalBiayaFix;

  return (
    <div className="max-w-2xl space-y-4">
      <Card>
        <Row label="Total Pendapatan Sewa" value={totalSewa} bold onToggle={() => setOpenSewa((v) => !v)} open={openSewa} icon={Banknote} />
        {openSewa && (
          <div className="ml-6 mt-1 mb-2 space-y-1">
            {perMobilSewa.map((x) => (
              <Row key={x.mobil.id} label={`${x.mobil.merek} ${x.mobil.nama}`} value={x.total} small />
            ))}
          </div>
        )}

        <Row label="Biaya Perawatan Kendaraan" value={-totalPerawatan} bold negative onToggle={() => setOpenPerawatan((v) => !v)} open={openPerawatan} icon={Wrench} />
        {openPerawatan && (
          <div className="ml-6 mt-1 mb-2 space-y-1">
            {perMobilPerawatan.map((x) => (
              <Row key={x.mobil.id} label={`${x.mobil.merek} ${x.mobil.nama}`} value={-x.total} small negative />
            ))}
          </div>
        )}

        <div className="my-2" style={{ borderTop: "1px dashed #E7EBF3" }} />
        <Row label="Total Pendapatan yang Dibagi" value={totalDibagi} bold />
        <Row label="Bagian Pemilik Mobil" value={-totalPemilik} negative />
        <Row label="Pendapatan yang Didapat Rental" value={pendapatanRental} bold />

        <div className="my-2" style={{ borderTop: "1px dashed #E7EBF3" }} />
        <Row label="Biaya Rental (Fix Cost / Bulan)" value={-totalBiayaFix} bold negative />
        <div className="ml-6 mt-1 mb-1 space-y-1">
          {biayaList.map((b) => (
            <Row key={b.id} label={b.nama} value={-b.jumlah} small negative />
          ))}
        </div>

        <div className="mt-3 p-4 rounded-xl flex items-center justify-between" style={{ background: pendapatanBersih >= 0 ? "#E7F7EF" : "#FDECEC" }}>
          <div className="text-[14px] font-bold">Pendapatan Bersih</div>
          <div className="text-[20px] font-extrabold" style={{ color: pendapatanBersih >= 0 ? "#12894A" : "#D93636" }}>{rupiah(pendapatanBersih)}</div>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value, bold, negative, small, onToggle, open, icon: Icon }) {
  return (
    <button
      onClick={onToggle}
      disabled={!onToggle}
      className={`w-full flex items-center justify-between py-2 ${onToggle ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-center gap-2">
        {onToggle && (open ? <ChevronDown size={14} color="#9AA5BD" /> : <ChevronRight size={14} color="#9AA5BD" />)}
        {Icon && <Icon size={14} color="#9AA5BD" />}
        <span className={small ? "text-[12.5px]" : "text-[14px]"} style={{ color: small ? "#8992A6" : "#101A33", fontWeight: bold ? 700 : 500 }}>{label}</span>
      </div>
      <span className={small ? "text-[12.5px]" : "text-[14px]"} style={{ color: negative ? "#D93636" : bold ? "#101A33" : "#3E4B63", fontWeight: bold ? 700 : 500 }}>
        {value < 0 ? "- " : ""}{rupiah(Math.abs(value))}
      </span>
    </button>
  );
}

// ---------- Field helpers ----------
function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <div className="text-[12px] font-semibold mb-1.5" style={{ color: "#5B6579" }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px]"
        style={{ border: "1px solid #DFE4EE" }}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="text-[12px] font-semibold mb-1.5" style={{ color: "#5B6579" }}>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] bg-white" style={{ border: "1px solid #DFE4EE" }}>
        <option value="">Pilih...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
