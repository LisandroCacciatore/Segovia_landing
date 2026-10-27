import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';
import { blogPosts } from '../src/data/blog.js';

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('rutas', () => {
  it('renderiza el home en /', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /Defendemos tus derechos laborales/i })
    ).toBeInTheDocument();
  });

  it('renderiza el indice del blog en /blog', () => {
    renderAt('/blog');
    expect(
      screen.getByRole('heading', { level: 1, name: /Blog legal laboral/i })
    ).toBeInTheDocument();
  });

  it('renderiza un articulo en /blog/:slug', () => {
    const post = blogPosts[0];
    renderAt(`/blog/${post.slug}`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(post.title);
  });

  it('renderiza privacidad en /privacidad', () => {
    renderAt('/privacidad');
    expect(
      screen.getByRole('heading', { level: 1, name: /Politica de privacidad/i })
    ).toBeInTheDocument();
  });

  it('muestra el 404 del blog para un slug inexistente', () => {
    renderAt('/blog/no-existe');
    expect(
      screen.getByRole('heading', { level: 1, name: /no existe/i })
    ).toBeInTheDocument();
  });
});
