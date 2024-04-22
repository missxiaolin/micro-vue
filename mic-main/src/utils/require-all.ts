export const requireAll = (
  requireContext: __WebpackModuleApi.RequireContext
) => {
  return requireContext.keys().forEach(requireContext);
};
