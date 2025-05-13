// Define the onBeforeRoute function
export default function onBeforeRoute(pageContext: any) {
  const { urlPathname } = pageContext;
  const match = urlPathname.match(/\/cat\/calorie\/food\/(\d+)\/?$/);
  if (match) {
    const foodId = match[1];
    return {
      pageContext: {
        routeParams: {
          foodId,
        },
      },
    };
  }
  return null;
}
