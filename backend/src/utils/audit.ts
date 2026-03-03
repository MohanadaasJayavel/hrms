import { db } from "../db";

export function logAudit(
  entityType: string,
  entityId: number,
  action: string,
  performedBy: number,
) {
  db.prepare(
    `
    INSERT INTO audit_logs (entity_type, entity_id, action, performed_by)
    VALUES (?, ?, ?, ?)
  `,
  ).run(entityType, entityId, action, performedBy);
}
