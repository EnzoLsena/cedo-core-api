import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1771179258349 implements MigrationInterface {
    name = 'CreateDatabase1771179258349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'common')
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
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'common',
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stock_batches" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "quantity" numeric NOT NULL,
                "expirationDate" TIMESTAMP NOT NULL,
                "stockItemId" integer,
                CONSTRAINT "PK_85b4f081f5a5c69009675db8b1f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stock_items" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "name" character varying NOT NULL,
                "unit" character varying NOT NULL,
                CONSTRAINT "PK_52a266aa3e04b8ad1f01088f3f0" PRIMARY KEY ("id")
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
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
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
                CONSTRAINT "PK_daec78e42198e9c42e1fed60eec" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "recipes" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "laborCost" numeric NOT NULL,
                "productId" integer,
                CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pricing_analysis" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "totalCost" numeric NOT NULL,
                "suggestedPrice" numeric NOT NULL,
                "marketAverage" numeric NOT NULL,
                "result" character varying NOT NULL,
                "productId" integer,
                CONSTRAINT "PK_7a83134a2f5a63f5d09646fd15b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "productId" character varying NOT NULL,
                "productName" character varying NOT NULL,
                "unitPrice" numeric NOT NULL,
                "quantity" integer NOT NULL,
                "totalPrice" numeric NOT NULL,
                "orderId" integer,
                CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "customers" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "name" character varying NOT NULL,
                "phone" character varying,
                "instagram" character varying,
                "email" character varying,
                "notes" character varying,
                CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"),
                CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "status" character varying NOT NULL,
                "scheduledFor" TIMESTAMP NOT NULL,
                "totalAmount" numeric NOT NULL,
                "customerId" integer,
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "financial_entries" (
                "id" SERIAL NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "type" character varying NOT NULL,
                "amount" numeric NOT NULL,
                "description" character varying NOT NULL,
                "referenceDate" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_61883ae069a9a2c228e3ecb0b6d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "stock_batches"
            ADD CONSTRAINT "FK_9637fdab9587eb64a016d360876" FOREIGN KEY ("stockItemId") REFERENCES "stock_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_items"
            ADD CONSTRAINT "FK_2c44770a9565be7ea9327b1a2ab" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes"
            ADD CONSTRAINT "FK_67c6c6236c69cf0173a89083485" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pricing_analysis"
            ADD CONSTRAINT "FK_f57262377f4e7ed732bb2d67af9" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"
        `);
        await queryRunner.query(`
            ALTER TABLE "pricing_analysis" DROP CONSTRAINT "FK_f57262377f4e7ed732bb2d67af9"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes" DROP CONSTRAINT "FK_67c6c6236c69cf0173a89083485"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_items" DROP CONSTRAINT "FK_2c44770a9565be7ea9327b1a2ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "stock_batches" DROP CONSTRAINT "FK_9637fdab9587eb64a016d360876"
        `);
        await queryRunner.query(`
            DROP TABLE "financial_entries"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TABLE "customers"
        `);
        await queryRunner.query(`
            DROP TABLE "order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "pricing_analysis"
        `);
        await queryRunner.query(`
            DROP TABLE "recipes"
        `);
        await queryRunner.query(`
            DROP TABLE "recipe_items"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            DROP TABLE "stock_items"
        `);
        await queryRunner.query(`
            DROP TABLE "stock_batches"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
    }

}
