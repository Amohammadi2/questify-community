import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Switch, Text } from "@nextui-org/react";
import { BtnSideIcon, Filler, FlexColumn, FlexRow } from "modules/app-ui";

interface ICommunityGeneralSettingsProps  {
  communityId: string;
}

export default function CommunityGeneralSettings({ communityId } : ICommunityGeneralSettingsProps) {
  return (
    <FlexColumn
      css={{
        border: '1px solid $gray400',
        borderRadius: '$md',
        py: '$5',
        px: '$4'
      }}
    >
      <FlexColumn css={{ my: '$3' }}>
        <FlexRow>
          <Text h4>خصوصی سازی انجمن</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexRow>
          <Text>
            در صورتی که یک انجمن خصوصی باشد، فقط افراد مورد تایید می توانند عضو انجمن شوند.
          </Text>
        </FlexRow>
      </FlexColumn>
      <FlexColumn css={{ my: '$3' }}>
        <FlexRow>
          <Text h4>حذف کردن انجمن</Text>
          <Filler />
          <Button flat color="error" size="xs">
            <BtnSideIcon icon={faTrash} />
            حذف
          </Button>
        </FlexRow>
        <FlexRow>
          <Text color="error">هشدار: این عمل غیرقابل بازگشت می باشد!</Text>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  )
}