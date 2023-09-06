import { replace }           from "svelte-spa-router";
import { wrap }              from "svelte-spa-router/wrap";
import ApiClient             from "@/utils/ApiClient";
import PageIndex             from "@/components/PageIndex.svelte";
import PageLogs              from "@/components/logs/PageLogs.svelte";
import PageRecords           from "@/components/records/PageRecords.svelte";
import PageAdmins            from "@/components/admins/PageAdmins.svelte";
import PageAdminLogin        from "@/components/admins/PageAdminLogin.svelte";
import PageApplication       from "@/components/settings/PageApplication.svelte";
import PageMail              from "@/components/settings/PageMail.svelte";
import PageStorage           from "@/components/settings/PageStorage.svelte";
import PageAuthProviders     from "@/components/settings/PageAuthProviders.svelte";
import PageTokenOptions      from "@/components/settings/PageTokenOptions.svelte";
import PageExportCollections from "@/components/settings/PageExportCollections.svelte";
import PageImportCollections from "@/components/settings/PageImportCollections.svelte";
import PageBackups           from "@/components/settings/PageBackups.svelte";

const baseConditions = [
    async (details) => {
        const realQueryParams = new URLSearchParams(window.location.search);

        if (details.location !== "/" && realQueryParams.has(import.meta.env.PB_INSTALLER_PARAM)) {
            return replace("/")
        }

        return true
    }
];

const routes = {
    "/login": wrap({
        component:  PageAdminLogin,
        conditions: baseConditions.concat([(_) => !ApiClient.authStore.isValid]),
        userData: { showAppSidebar: false },
    }),

    "/collections": wrap({
        component:  PageRecords,
        conditions: baseConditions.concat([(_) => ApiClient.authStore.isValid]),
        userData: { showAppSidebar: true },
    }),

    // catch-all fallback
    "*": wrap({
        component: PageIndex,
        userData: { showAppSidebar: false },
    }),
};

export default routes;
