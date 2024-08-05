import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { dynamicLinks, DynamicLink } from "../schema/dynamicLink";
import { and, eq, not } from "drizzle-orm";
import { withPagination } from "../operations/pagination";

type LinkTargetUrl = { targetUrl: string | null }

type insertOne = {
    shortCode: string;
    targetUrl: string;
    qrStyleOptions: Object;
    createdBy: string;
}
type updateOne = {
    shortCode: string;
    targetUrl: string;
    qrStyleOptions: Object;
}

export default class LinkRepository {

    constructor(
        private db: PostgresJsDatabase
    ) { }

    async find(page: number = 1, pageSize: number = 10): Promise<Array<DynamicLink>> {
        const links = this.db.select().from(dynamicLinks).$dynamic()
        const data = await withPagination(links, page, pageSize);
        return data
    }

    async findOneByIdAndUserId(id: string, userId: string) {
        const [link] = await this.db.select().from(dynamicLinks).where(
            and(
                eq(dynamicLinks.id, id),
                eq(dynamicLinks.createdBy, userId)
            )
        ).limit(1);
        return link
    }

    async findByUserId(userId: string, page: number = 1, pageSize: number = 10): Promise<Array<DynamicLink>> {
        const links = this.db.select().from(dynamicLinks).where(eq(dynamicLinks.createdBy, userId)).$dynamic()
        const data = await withPagination(links, page, pageSize);
        return data
    }

    async findUserLink(linkId: string, userId: string): Promise<DynamicLink | null> {
        const [link] = await this.db.select().from(dynamicLinks).where(
            and(
                eq(dynamicLinks.id, linkId),
                eq(dynamicLinks.createdBy, userId)
            )
        ).limit(1);
        return link
    }

    async findLinkByShortCode(shortCode: string): Promise<LinkTargetUrl | null> {
        const [link] = await this.db.select({
            targetUrl: dynamicLinks.targetUrl
        }).from(dynamicLinks).where(eq(dynamicLinks.shortCode, shortCode)).limit(1);
        return link
    }

    async insertOne(linkData: insertOne) {
        const newLink = await this.db.insert(dynamicLinks).values(linkData).returning();
        return newLink
    }

    async deleteOneByIdAndUserId(linkId: string, userId: string) {
        const [deletedLink] = await this.db.delete(dynamicLinks).where(
            and(
                eq(dynamicLinks.id, linkId),
                eq(dynamicLinks.createdBy, userId)
            )
        ).returning();
        return deletedLink
    }

    async findByShortCodeExcludedCurrent(linkId: string, shortCode: string) {
        const [existingLink] = await this.db.select().from(dynamicLinks).where(and(
            not(eq(dynamicLinks.id, linkId)),
            eq(dynamicLinks.shortCode, shortCode)
        )).limit(1);

        return existingLink
    }

    async updateOneByIdAndUserId(linkId: string, userId: string, data: updateOne) {
        const [updatedLink] = await this.db.update(dynamicLinks)
            .set(data)
            .where(
                and(
                    eq(dynamicLinks.createdBy, userId),
                    eq(dynamicLinks.id, linkId)
                )
            )
            .returning();
        return updatedLink
    }

}