package com.abdullahkaya.rest;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.abdullahkaya.rest");

        noClasses()
            .that()
            .resideInAnyPackage("com.abdullahkaya.rest.service..")
            .or()
            .resideInAnyPackage("com.abdullahkaya.rest.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.abdullahkaya.rest.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
