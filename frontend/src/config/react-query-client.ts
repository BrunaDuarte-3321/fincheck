import { MutationCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache(/* {
    onSuccess(_data, _variables, _context, mutation) {
      handleRequestSuccess(mutation.meta);
    },
    onError(error, _variables, _context, mutation) {
      handleRequestError(error, mutation.options.mutationKey, mutation.meta);
    },
  } */),
});
