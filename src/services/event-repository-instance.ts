import type { EventRepository } from "./calendar-repository";
import { LocalStorageEventRepository } from "./local-storage-event-repository";

// Única instância compartilhada do repositório.
// Este é o ÚNICO lugar que conhece a implementação concreta.
// Trocar de localStorage para uma API HTTP = mudar só esta linha.
export const eventRepository: EventRepository = new LocalStorageEventRepository();
