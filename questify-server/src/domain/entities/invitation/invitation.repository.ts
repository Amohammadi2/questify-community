import { Invitation } from "src/domain/entities/invitation/invitation.entity";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { Repository } from "src/domain/shared/repository.absclass";

export interface IInvitationPMD {
  targetId: string;
  invitorId: string;
}

export abstract class InvitationRepository extends Repository<Invitation, IInvitationPMD> {
  abstract instantiate(): Invitation;
  abstract remove(tx: ITransactionUnit, entity: Invitation): Promise<boolean>;
  protected abstract persist(tx: ITransactionUnit, entity: Invitation, metadata: IInvitationPMD): Promise<boolean>;
  abstract findByCode(code: string): Promise<Invitation|null>;
  abstract findByInvitor(invitorUserId: string): Promise<Invitation[]|null>;
}