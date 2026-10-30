import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";

// Runs an async service call and tracks its state: { data, loading, error }.
//
//   const { data, loading, error, reload } = useApi(() => getPinnedDocuments(), []);
//
// `deps` works like useEffect's list: the call runs again when one changes.
// activeRole is always added, because every service answers for the current
// user, so a role switch must re-fetch (services/README.md, "Page rules").
export default function useApi(fetcher, deps = []) {
  const { activeRole } = useContext(AuthContext);
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    // A newer request (role switch, reload) makes this one stale. Ignoring its
    // answer stops a slow reply for the previous role from showing up.
    let ignore = false;
    // Clear data too, so one role's documents are never shown to another role.
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((error) => !ignore && setState({ data: null, loading: false, error }));

    return () => {
      ignore = true;
    };
    // fetcher is a new function every render, so it is left out on purpose;
    // `deps` is the caller's list of what should trigger a new request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, activeRole, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  return { ...state, reload };
}