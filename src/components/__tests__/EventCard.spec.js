import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import EventCard from '../EventCard.vue';

describe('EventCard', () => {
  it('muestra el evento y emite su id al pedir el detalle', async () => {
    const evento = {
      id: 2,
      titulo: 'Conferencia de inteligencia artificial',
      categoria: 'Conferencia',
      lugar: 'Auditorio principal',
    };
    const wrapper = mount(EventCard, { props: { evento } });

    expect(wrapper.text()).toContain(evento.titulo);
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('ver')).toEqual([[evento.id]]);
  });
});
