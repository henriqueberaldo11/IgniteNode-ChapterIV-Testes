import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1646415110864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uniqueidentifier",
            default: "newid()",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "driver_license",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "bit",
            default: 0,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "getdate()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
