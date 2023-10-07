<?php

namespace App\Controller;

use App\Entity\Boards;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class BoardsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Boards::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            // IdField::new('id'),
            TextField::new('symbol'),
            // TextEditorField::new('description'),
        ];
    }

}