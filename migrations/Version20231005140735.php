<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231005140735 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reply ADD text LONGTEXT NOT NULL, ADD image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE thread ADD boards_id INT NOT NULL, ADD text LONGTEXT NOT NULL, ADD image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C837A4426DD FOREIGN KEY (boards_id) REFERENCES boards (id)');
        $this->addSql('CREATE INDEX IDX_31204C837A4426DD ON thread (boards_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reply DROP text, DROP image');
        $this->addSql('ALTER TABLE thread DROP FOREIGN KEY FK_31204C837A4426DD');
        $this->addSql('DROP INDEX IDX_31204C837A4426DD ON thread');
        $this->addSql('ALTER TABLE thread DROP boards_id, DROP text, DROP image');
    }
}
