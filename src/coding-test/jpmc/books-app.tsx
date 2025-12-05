import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './books-app.module.css'

interface Book {
  work: {
    title: string
    author_names: string[]
    cover_edition_key: string
  }
}

interface ApiResponse {
  reading_log_entries: Book[]
}

function BooksApp() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://openlibrary.org/people/mekBot/books/want-to-read.json'
        )
        setBooks(response.data.reading_log_entries)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles['header-content']}>Header</div>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles['sidebar-content']}>Side Bar</div>
        </aside>

        <main className={styles['main-content']}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <div className={styles['books-grid']}>
              {books.map((book, index) => (
                <div key={index} className={styles['book-card']}>
                  <div className={styles['book-title']}>Title: {book.work.title}</div>
                  <div className={styles['book-author']}>
                    Author name: {book.work.author_names.join(', ')}
                  </div>
                  <div className={styles['book-edition']}>
                    Cover edition key: {book.work.cover_edition_key}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className={styles.footer}>
        <div className={styles['footer-content']}>Footer</div>
      </footer>
    </div>
  )
}

export default BooksApp
