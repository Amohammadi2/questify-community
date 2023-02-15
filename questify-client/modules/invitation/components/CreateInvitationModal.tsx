import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Text, Button, styled } from '@nextui-org/react';
import { FlexColumn, ProfileSummery, Tab, TabItem } from 'modules/app-ui';
import { useEffect, useState } from 'react';
import { emitter } from '../events/emitter';

const ListContainer = styled(FlexColumn, {
  h: '300px',
  overflowY: 'scroll'
})

interface IDestinationList {
  activeTab: number;
  dest: string;
  setDest: (d: string) => void;
}

const DestinationList = ({ activeTab, dest, setDest } : IDestinationList) => {
  switch (activeTab) {
    case 1:
      return (
        <ListContainer>
        {new Array(5).fill(null).map((v, i) => {
          return (
            <ProfileSummery
              id={`${i}`}
              text={"یک مدرسه خوب"}
              img="/imgs/snow-fall.jpg"
              selectable
              onSelect={(id, isSelected) => {
                if (isSelected)
                  setDest(id)
                else
                  setDest(null);
              }}
              selected={`${i}`===dest}
            />
          )
        })}
        </ListContainer>
      )
    case 2:
      return (
        <ListContainer>
        {new Array(8).fill(null).map((v, _i) => {
          const i = _i + 30; // so not to conflict with the ids from the previous list
          return (
            <ProfileSummery
              id={`${i}`}
              text={"یک انجمن جالب"}
              img="/imgs/snow-fall.jpg"
              selectable
              onSelect={(id, isSelected) => {
                if (isSelected)
                  setDest(id)
                else
                  setDest(null);
              }}
              selected={`${i}`===dest}
            />
          )
        })}
        </ListContainer>
      )
  }
}


export default function CreateInvitationModal() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [dest, setDest] = useState<string>(null);

  useEffect(() => {
    const unsubscribe = emitter.subscribe('open-modal', ()=>{
      setIsOpen(true);
    });
    return unsubscribe;
  }, [])

  return (
    <Modal
      closeButton
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header>
        <Text h3 css={{ textAlign: 'center' }}>ساختن کد دعوت</Text>
      </Modal.Header>
      <Modal.Body>
        <Tab>
          <TabItem n={1} activeTab={activeTab} onActivate={setActiveTab}>مدارس</TabItem>
          <TabItem n={2} activeTab={activeTab} onActivate={setActiveTab}>انمجن ها</TabItem>
        </Tab>
        <DestinationList activeTab={activeTab} dest={dest} setDest={setDest} />
      </Modal.Body>
      <Modal.Footer>
        <Button css={{flexGrow:1}} disabled={!dest}>
          <FontAwesomeIcon icon={faArrowRight} style={{ margin: '0px 5px' }} />
          بعدی
        </Button>
      </Modal.Footer>
    </Modal>
  )

}