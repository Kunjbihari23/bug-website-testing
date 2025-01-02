export default async function sitemap() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const urls = array.map((ids) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/buidling/${ids}`,
    lastModified: new Date(),
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
    },
    ...urls,
  ];
}
