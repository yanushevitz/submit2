<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231005140314 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE anon (id INT AUTO_INCREMENT NOT NULL, identifier VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE boards (id INT AUTO_INCREMENT NOT NULL, symbol VARCHAR(3) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reply (id INT AUTO_INCREMENT NOT NULL, thread_id INT DEFAULT NULL, creator_id INT DEFAULT NULL, INDEX IDX_FDA8C6E0E2904019 (thread_id), INDEX IDX_FDA8C6E061220EA6 (creator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE thread (id INT AUTO_INCREMENT NOT NULL, anon_id INT DEFAULT NULL, INDEX IDX_31204C83DBC88A8B (anon_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE reply ADD CONSTRAINT FK_FDA8C6E0E2904019 FOREIGN KEY (thread_id) REFERENCES thread (id)');
        $this->addSql('ALTER TABLE reply ADD CONSTRAINT FK_FDA8C6E061220EA6 FOREIGN KEY (creator_id) REFERENCES anon (id)');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C83DBC88A8B FOREIGN KEY (anon_id) REFERENCES anon (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reply DROP FOREIGN KEY FK_FDA8C6E0E2904019');
        $this->addSql('ALTER TABLE reply DROP FOREIGN KEY FK_FDA8C6E061220EA6');
        $this->addSql('ALTER TABLE thread DROP FOREIGN KEY FK_31204C83DBC88A8B');
        $this->addSql('DROP TABLE anon');
        $this->addSql('DROP TABLE boards');
        $this->addSql('DROP TABLE reply');
        $this->addSql('DROP TABLE thread');
    }
}
