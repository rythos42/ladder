﻿// <auto-generated />
using System;
using JUDI.Server.Ladder.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JUDI.Server.Ladder.Data.Migrations
{
    [DbContext(typeof(LadderDbContext))]
    partial class LadderDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JUDI.Server.Ladder.Data.Entities.Claim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ClaimDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ClaimEvidence")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimingUsername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SkillId")
                        .HasColumnType("int");

                    b.Property<string>("TaggedEndorserEmails")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SkillId");

                    b.ToTable("Claims");
                });

            modelBuilder.Entity("JUDI.Server.Ladder.Data.Entities.Endorsement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("EndorsedClaimId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndorsementDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EndorsementEvidence")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EndorserUsername")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EndorsedClaimId");

                    b.ToTable("Endorsements");
                });

            modelBuilder.Entity("JUDI.Server.Ladder.Data.Entities.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AddedByUsername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("AddedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Summary")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("JUDI.Server.Ladder.Data.Entities.Claim", b =>
                {
                    b.HasOne("JUDI.Server.Ladder.Data.Entities.Skill", "Skill")
                        .WithMany()
                        .HasForeignKey("SkillId");
                });

            modelBuilder.Entity("JUDI.Server.Ladder.Data.Entities.Endorsement", b =>
                {
                    b.HasOne("JUDI.Server.Ladder.Data.Entities.Claim", "EndorsedClaim")
                        .WithMany()
                        .HasForeignKey("EndorsedClaimId");
                });
#pragma warning restore 612, 618
        }
    }
}
