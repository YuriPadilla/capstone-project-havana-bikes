import useSWR from "swr";
import { getSiteSettingsWithDefaults } from "@/utils/defaultSiteSettings";

export default function useSiteSettings() {
  const { data, error, isLoading } = useSWR("/api/site-settings");
  const siteSettings = data?.settings || data || {};
  const settings = getSiteSettingsWithDefaults(siteSettings);

  return {
    settings,
    isLoading,
    error,
  };
}
