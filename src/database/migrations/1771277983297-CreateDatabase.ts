import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1771277983297 implements MigrationInterface {
  name = 'CreateDatabase1771277983297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('COMMON', 'ADMIN')
    `);

    await queryRunner.query(`
      CREATE TYPE "public"."orders_status_enum" AS ENUM('OPEN', 'COMPLETED', 'CANCELED')
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'COMMON',
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "categories" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "name" character varying NOT NULL,
        "description" character varying,
        "isActive" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_categories_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "name" character varying NOT NULL,
        "salePrice" numeric NOT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "categoryId" integer,
        CONSTRAINT "PK_products_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "recipes" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "laborCost" numeric NOT NULL DEFAULT '0',
        "totalCost" numeric NOT NULL DEFAULT '0',
        CONSTRAINT "PK_recipes_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "recipe_items" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "ingredientName" character varying NOT NULL,
        "quantity" numeric NOT NULL,
        "unitCost" numeric NOT NULL,
        "recipeId" integer,
        CONSTRAINT "PK_recipe_items_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "customers" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "name" character varying NOT NULL,
        "email" character varying,
        "phone" character varying,
        "isActive" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_customers_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "status" "public"."orders_status_enum" NOT NULL DEFAULT 'OPEN',
        "totalAmount" numeric NOT NULL DEFAULT '0',
        "customerId" integer,
        CONSTRAINT "PK_orders_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "id" SERIAL NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "quantity" numeric NOT NULL,
        "unitPrice" numeric NOT NULL,
        "totalPrice" numeric NOT NULL,
        "orderId" integer,
        "productId" integer,
        CONSTRAINT "PK_order_items_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "products"
      ADD CONSTRAINT "FK_products_category"
      FOREIGN KEY ("categoryId") REFERENCES "categories"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "recipe_items"
      ADD CONSTRAINT "FK_recipe_items_recipe"
      FOREIGN KEY ("recipeId") REFERENCES "recipes"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_orders_customer"
      FOREIGN KEY ("customerId") REFERENCES "customers"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "order_items"
      ADD CONSTRAINT "FK_order_items_order"
      FOREIGN KEY ("orderId") REFERENCES "orders"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "order_items"
      ADD CONSTRAINT "FK_order_items_product"
      FOREIGN KEY ("productId") REFERENCES "products"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_order_items_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_order_items_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_customer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_items" DROP CONSTRAINT "FK_recipe_items_recipe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_products_category"`,
    );

    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "recipe_items"`);
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
