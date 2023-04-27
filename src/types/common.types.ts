import { About, Navbar } from '@/client/generated/schemas';

export type NavbarItemsType = Omit<Navbar, 'contentfulMetadata' | 'sys'>[];
export type AboutItemType = Omit<About, 'contentfulMetadata' | 'sys'>;
