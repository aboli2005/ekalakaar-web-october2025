import React, { useState } from "react";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "./AdminNews.css";

const DUMMY_NEWS = [
  {
    id: 1,
    title: "Inaugural Artist Residency Announced",
    date: "2025-11-10",
    description: "Our newest residency program welcomes artists from all disciplines.",
  },
  {
    id: 2,
    title: "Partnership with National Art Board",
    date: "2025-11-08",
    description: "Joint effort to boost contemporary art exposure and events.",
  },
];

const AdminNews = () => {
  const [newsList, setNewsList] = useState(DUMMY_NEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", description: "" });

  const openModal = (news = null) => {
    setEditing(news);
    setForm(news || { title: "", date: "", description: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setForm({ title: "", date: "", description: "" });
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setNewsList(newsList.map(n => n.id === editing.id ? { ...editing, ...form } : n));
    } else {
      setNewsList([...newsList, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setNewsList(newsList.filter(n => n.id !== id));
  };

  const getInitial = title => (title ? title.charAt(0).toUpperCase() : "N");

  return (
    <>
      <AdminNavbar />
      <div className="news-admin-enhanced-container">
        <div className="news-header-enhanced">
          <h2>
            <span className="news-icon">📰</span>Manage News
          </h2>
          <button className="add-news-btn-enhanced" onClick={() => openModal()}>
            <span className="plus-icon">+</span> Add News
          </button>
        </div>
        <div className="news-list-enhanced">
          {newsList.length === 0 ? (
            <div className="empty-news">No news added yet.</div>
          ) : (
            newsList.map(news => (
              <div className="news-card-enhanced" key={news.id}>
                <div className="news-card-avatar">
                  <span>{getInitial(news.title)}</span>
                </div>
                <div className="news-card-content">
                  <h3>{news.title}</h3>
                  <div className="news-meta">
                    <span className="news-date">
                      <i className="fa fa-calendar-alt"></i>
                      {news.date}
                    </span>
                  </div>
                  <p className="news-desc">{news.description}</p>
                </div>
                <div className="news-card-actions">
                  <button className="edit-btn-enhanced" onClick={() => openModal(news)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="delete-btn-enhanced" onClick={() => handleDelete(news.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay-enhanced" onClick={closeModal}>
            <div className="modal-content-enhanced" onClick={e => e.stopPropagation()}>
              <h3>{editing ? "Edit News" : "Add News"}</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Title
                  <input name="title" value={form.title} onChange={handleChange} required />
                </label>
                <label>
                  Date
                  <input name="date" type="date" value={form.date} onChange={handleChange} required />
                </label>
                <label>
                  Description
                  <textarea name="description" value={form.description} onChange={handleChange} required />
                </label>
                <div className="modal-actions-enhanced">
                  <button type="submit" className="save-btn-enhanced">{editing ? "Save" : "Add"}</button>
                  <button type="button" className="cancel-btn-enhanced" onClick={closeModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminNews;
