import { Text, Modal } from "@nextui-org/react";
import ReactMarkdown from 'react-markdown';

export default function PreviewModal({ previewOpen, setPreviewOpen, title, content }) {
  return (<Modal closeButton fullScreen scroll open={previewOpen} onClose={() => setPreviewOpen(false)}>
    <Modal.Header>
      <Text h1>{title}</Text>
    </Modal.Header>
    <Modal.Body css={{
      textAlign: 'right',
      px: '5%',
      '@xs': {
        px: '10%'
      },
      '@sm': {
        px: '20%'
      }
    }}>
      <ReactMarkdown components={{
        h1: 'h3',
        h2: 'h4',
        h3: 'h5',
        h4: 'h6',
        h5: 'strong',
        h6: 'strong'
      }} skipHtml>{content}</ReactMarkdown>
    </Modal.Body>
    <Modal.Footer>
      <Text></Text>
    </Modal.Footer>
  </Modal>);
}
