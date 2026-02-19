import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserScopeToEntities1772277983298 implements MigrationInterface {
  name = 'AddUserScopeToEntities1772277983298';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "products" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "customers" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" integer`);

    await queryRunner.query(`
      UPDATE "categories"
      SET "userId" = (SELECT id FROM "users" ORDER BY id ASC LIMIT 1)
      WHERE "userId" IS NULL
    `);

    await queryRunner.query(`
      UPDATE "products" p
      SET "userId" = COALESCE(c."userId", (SELECT id FROM "users" ORDER BY id ASC LIMIT 1))
      FROM "categories" c
      WHERE p."categoryId" = c."id"
        AND p."userId" IS NULL
    `);

    await queryRunner.query(`
      UPDATE "customers"
      SET "userId" = (SELECT id FROM "users" ORDER BY id ASC LIMIT 1)
      WHERE "userId" IS NULL
    `);

    await queryRunner.query(`
      UPDATE "orders" o
      SET "userId" = COALESCE(c."userId", (SELECT id FROM "users" ORDER BY id ASC LIMIT 1))
      FROM "customers" c
      WHERE o."customerId" = c."id"
        AND o."userId" IS NULL
    `);

    await queryRunner.query(`
      UPDATE "recipes"
      SET "userId" = (SELECT id FROM "users" ORDER BY id ASC LIMIT 1)
      WHERE "userId" IS NULL
    `);

    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "userId" SET NOT NULL`);

    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD CONSTRAINT "FK_categories_user"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products"
      ADD CONSTRAINT "FK_products_user"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "customers"
      ADD CONSTRAINT "FK_customers_user"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_orders_user"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "recipes"
      ADD CONSTRAINT "FK_recipes_user"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_recipes_user"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_user"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_customers_user"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_products_user"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_categories_user"`);

    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "userId"`);
  }
}
