import { Avatar, Switch, Text, Button, Modal, Input } from "@nextui-org/react";
import { Filler, FlexColumn, FlexRow } from "modules/app-ui";
import { useRecoilValue } from "recoil";
import { accountAtom } from "modules/auth/auth-store/states";
import { EditableTextField, ImageEditor } from "modules/shared";
import { useEffect, useState } from "react";
import BorderedBox from "../ui/BorderedBox";
import UserProfileSettings from "./UserProfileSettings";
import EmailNotificationSettings from "./EmailNotificationSettings";
import AccountSettings from "./AccountSettings";

export default function UserProfileDashboard() {
  return (
    <>
      <FlexRow css={{ flexDirection: 'column', alignItems: 'center', '@sm': { flexDirection: 'row', alignItems: 'unset' } }}>
        <UserProfileSettings />
        <EmailNotificationSettings />
      </FlexRow>
      <AccountSettings />
    </>
  )
}