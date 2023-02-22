import type { NextPage } from "next";
import {
  PROJECTS,
  PROJECT_SUGGESTION_LINK,
  Project,
} from "@constants/projects";
import Link from "next/link";
import { Page } from "../components/Page";
import { ChevronDown, ChevronRight, ExternalLink } from "react-feather";
import { getChainNiceName, getViewDelegatePath } from "../utils/blockchain";

const Home: NextPage = () => {
  return (
    <Page
      title="PoolTogether Delegation Donation"
      description="Delegate your chances to win to another wallet while maintaining full custody of your funds."
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {PROJECTS.map((project) => (
          <PopularDelegateCard key={project.title} project={project} />
        ))}
        <SuggestionsCard />
      </div>
    </Page>
  );
};

interface PopularDelegateCardProps {
  project: Project;
}

const PopularDelegateCard = (props: PopularDelegateCardProps) => {
  const { title, description, addresses, website } = props.project;
  return (
    <div className="card card-compact w-full sm:w-96 bg-base-200">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions w-full justify-between">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link gap-1"
          >
            More info <ExternalLink className="h-4" />
          </a>
          {addresses.length === 1 ? (
            <Link
              href={getViewDelegatePath(
                addresses[0].chainId,
                addresses[0].prizePoolAddress,
                addresses[0].delegateAddress
              )}
            >
              <button className="btn btn-primary m-1 gap-2">
                Donate <ChevronRight />
              </button>
            </Link>
          ) : (
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-primary m-1 gap-2">
                Donate <ChevronDown />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  {addresses.map((data) => (
                    <Link
                      key={`${data.chainId}-${data.prizePoolAddress}-${data.delegateAddress}`}
                      href={getViewDelegatePath(
                        data.chainId,
                        data.prizePoolAddress,
                        data.delegateAddress
                      )}
                    >
                      Donate on {getChainNiceName(data.chainId)}
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SuggestionsCard = () => {
  return (
    <div className="card card-compact w-full sm:w-96 bg-base-200">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Suggest a project</h2>
        <p>
          Do you know of a project that could benefit from donations? Let us
          know and we&aposll add them to the list.
        </p>
        <div className="card-actions w-full justify-center">
          <a
            href={PROJECT_SUGGESTION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary gap-1"
          >
            Suggest a project <ExternalLink className="h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
