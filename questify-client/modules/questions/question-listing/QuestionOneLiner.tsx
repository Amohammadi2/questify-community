import { styled } from "@nextui-org/react";
import Link from "next/link";

const QuestionOneLinerUI = styled('div', {
  py: '$3',
  px: '$5',
  borderTop: '1px solid $gray100',
  borderBottom: '1px solid $gray100',
})

interface QuestionOneLinerProps {
  id: string;
  title: string;
}

export default function QuestionOneLiner({ id, title } : QuestionOneLinerProps) {
  return (
    <Link href={"/question-details?qid="+id}>
      <QuestionOneLinerUI>
        {title}
      </QuestionOneLinerUI>
    </Link>
  );
}