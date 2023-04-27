export const GA_TRACKING_ID: string =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

type GTagEvent = {
  action: string;
  category: string;
  value?: string;
  label?: string;
};

type UseGtagRestult = {
  gtagPageView: (url: URL) => void;
  gtagEvent: (gtagEvent: GTagEvent) => void;
};

export const useGtag = (): UseGtagRestult => {
  const pageView = (url: URL) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  };

  const event = ({ action, category, value, label }: GTagEvent): void => {
    window.gtag('event', action, {
      event_category: category,
      value,
      label,
    });
  };

  return {
    gtagEvent: event,
    gtagPageView: pageView,
  };
};
