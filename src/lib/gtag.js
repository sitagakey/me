export const GA_TRACKING_ID = 'G-HYKZGM0HE0'

export const pageView = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};