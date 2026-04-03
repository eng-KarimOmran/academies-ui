import { getAcademy } from "@/service/academy.service";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { AcademyDetails } from "@/types/academy";

import AcademySkeleton from "./AcademySkeleton";
import CustomDialog from "@/components/Dialog/CustomDialog";
import { useAcademyActions } from "../hook/useAcademyActions";
import BasicDataSection from "./BasicDataSection";
import OwnersSection from "./OwnersSection";
import SocialMediaSection from "./SocialMediaSection";

export default function AcademyDetailsView() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["academies", id],
    queryFn: () => getAcademy(id ?? ""),
    staleTime: Infinity,
    enabled: !!id,
    select: (data) => data.data.data as AcademyDetails,
  });

  const {
    isOpen,
    setIsOpen,
    configDialog,
    openUpdateBasicData,
    openOwnerAction,
    openSocialAction,
  } = useAcademyActions(data);

  if (isLoading) return <AcademySkeleton />;
  if (error || !data) return <Navigate to="/dashboard/academies" />;

  return (
    <>
      <section className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
        <BasicDataSection academy={data} onEdit={openUpdateBasicData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OwnersSection owners={data.owners} onAction={openOwnerAction} />

          <SocialMediaSection
            socials={data.socialMediaPlatforms}
            onAction={openSocialAction}
          />
        </div>
      </section>

      {configDialog && (
        <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} {...configDialog} />
      )}
    </>
  );
}
