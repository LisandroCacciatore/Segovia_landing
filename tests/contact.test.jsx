import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../src/sections/Contact.jsx';

async function fillRequired(user) {
  await user.type(screen.getByLabelText(/Nombre y apellido/i), 'Juan Perez');
  await user.type(screen.getByLabelText(/Telefono \/ WhatsApp/i), '3415551234');
  await user.type(screen.getByLabelText(/Detalle de tu situacion/i), 'Me despidieron sin causa');
  await user.click(screen.getByRole('checkbox'));
}

async function submit(user) {
  await user.click(screen.getByRole('button', { name: /Enviar consulta gratuita/i }));
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
  vi.spyOn(window, 'open').mockImplementation(() => null);
});

describe('formulario de contacto', () => {
  it('abre WhatsApp cuando VITE_FORM_ENDPOINT esta vacio', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', '');
    const user = userEvent.setup();

    render(<Contact />);
    await fillRequired(user);
    await submit(user);

    expect(fetch).not.toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledTimes(1);

    const [url, target, features] = window.open.mock.calls[0];
    expect(url).toMatch(/^https:\/\/wa\.me\/5493412752594\?text=/);
    expect(decodeURIComponent(url)).toContain('Nombre: Juan Perez');
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');
    expect(await screen.findByText(/Te abrimos WhatsApp/i)).toBeInTheDocument();
  });

  it('no envia nada si el honeypot viene completo', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', 'https://example.test/form');
    const user = userEvent.setup();

    render(<Contact />);
    await fillRequired(user);
    await user.type(screen.getByLabelText(/leave empty/i), 'bot');
    await submit(user);

    expect(fetch).not.toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
    expect(await screen.findByText(/Te abrimos WhatsApp/i)).toBeInTheDocument();
  });

  it('saca honeypot del payload del POST', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', 'https://example.test/form');
    fetch.mockResolvedValue({ ok: true });
    const user = userEvent.setup();

    render(<Contact />);
    await fillRequired(user);
    await submit(user);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('https://example.test/form');
    expect(options.method).toBe('POST');

    const body = JSON.parse(options.body);
    expect(body).not.toHaveProperty('honeypot');
    expect(body).toMatchObject({
      name: 'Juan Perez',
      consent: true,
      origen: 'landing',
    });
    expect(body.enviado).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
