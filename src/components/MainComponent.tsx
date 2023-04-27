import React from 'react';
import { useGetWebsiteDataQuery } from '@/client/generated/hooks';
import { notEmpty } from '@/utils/NotEmpty';
import { About, ContactLinks, Projects } from '@/client/generated/schemas';
import { ExperienceEntry } from '@/client/generated/schemas';
import { NavbarContainer } from './navbar';
import { BannerComponent } from './banner';
import { AboutContainer } from './about';
import { ExperienceContainer } from './experience';
import { ProjectsContainer } from './projects';
import { ContactContainer } from './contact';
import { Footer } from './footer';

export const MainComponent: React.FC = () => {
  const { data, loading } = useGetWebsiteDataQuery();

  return (
    <>
      {loading && <p>loading...</p>}
      {!loading && data && (
        <>
          {data.navbarCollection && (
            <NavbarContainer
              navbarItems={data.navbarCollection.items.filter(notEmpty) ?? []}
            />
          )}
          <BannerComponent />
          {data.about && <AboutContainer aboutInfo={data.about as About} />}
          {data.experienceEntryCollection && (
            <ExperienceContainer
              experiences={
                data.experienceEntryCollection.items as ExperienceEntry[]
              }
            />
          )}
          {data.projectsCollection && (
            <ProjectsContainer
              projects={data.projectsCollection.items as Projects[]}
            />
          )}
          {data.contactLinksCollection && (
            <ContactContainer
              contactLinks={data.contactLinksCollection.items as ContactLinks[]}
            />
          )}
          {data.navbarCollection && data.contactLinksCollection && (
            <Footer
              items={data.navbarCollection.items.filter(notEmpty) ?? []}
              contactLinks={data.contactLinksCollection.items as ContactLinks[]}
            />
          )}
        </>
      )}
    </>
  );
};

export default MainComponent;
