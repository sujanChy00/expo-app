import { FlashList } from '@shopify/flash-list';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '../../lib/utils';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { ChevronsLeft } from '../icons/chevrons-left';
import { ChevronsRight } from '../icons/chevrons-rght';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { P } from './typography';

import useI18n from '@/hooks/useI81n';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowPress?: (row: TData) => void;
  estimatedItemSize?: number;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  isPending?: boolean;
  className?: string;
  pagination?: {
    currentPage?: number;
    totalPage?: number;
    isLast?: boolean;
    totalItems?: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowPress,
  estimatedItemSize = 100,
  isRefreshing = false,
  onRefresh,
  isPending,
  pagination,
  className,
}: DataTableProps<TData, TValue>) {
  const insets = useSafeAreaInsets();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { getText } = useI18n();
  const router = useRouter();
  const searchParams = useLocalSearchParams<{ size?: string; page?: string }>();

  const [size, setSize] = React.useState(searchParams?.size || '30');
  const [page, setPage] = React.useState<string | undefined>(searchParams?.page || '1');

  const previousPage = () => {
    if (searchParams?.page) {
      const newPage = Number(searchParams.page) - 1;
      setPage(newPage.toString());
      router.setParams({ page: newPage > 0 ? newPage.toString() : undefined });
    }
  };

  const nextPage = () => {
    if (searchParams?.page) {
      const newPage = Number(searchParams.page) + 1;
      setPage(newPage.toString());
      router.setParams({
        page: newPage.toString(),
      });
    } else {
      setPage('2');
      router.setParams({
        page: '2',
      });
    }
  };

  return (
    <View className="flex-1 rounded-md border border-border bg-background">
      {isRefreshing && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          className="absolute top-16 h-14 w-screen items-center justify-center">
          <ActivityIndicator size="small" className="text-foreground" />
        </Animated.View>
      )}
      <ScrollView
        horizontal
        bounces={false}
        className={cn('max-h-[75vh] w-full bg-background', className)}
        contentContainerClassName="w-full rounded-md bg-background"
        showsHorizontalScrollIndicator={false}>
        <Table className="rounded-md bg-background">
          <TableHeader className="rounded-t-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: `${100 / columns.length}%`,
                      }}>
                      <P className="text-sm font-medium">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </P>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <FlashList
              data={table.getRowModel().rows}
              estimatedItemSize={estimatedItemSize}
              ListEmptyComponent={() => {
                if (isPending)
                  return (
                    <View className="items-center justify-center py-20">
                      <P>{getText('Loading')}...</P>
                    </View>
                  );

                return (
                  <View className="items-center gap-3 py-6">
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                      }}
                      source={require('@/assets/images/sorry.png')}
                      alt="no results"
                    />
                    <P className="text-center"> No results...</P>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="bg-background"
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  style={{ opacity: 0 }}
                />
              }
              renderItem={({ item: row, index }) => {
                const isLast = data.length - 1 === index;
                return (
                  <TableRow
                    className={cn(
                      'flex-row items-center active:opacity-70',
                      isLast ? 'border-transparent border-b-transparent' : '',
                      onRowPress ? 'cursor-pointer' : 'cursor-default'
                    )}
                    onPress={
                      onRowPress
                        ? () => {
                            onRowPress(row.original);
                          }
                        : undefined
                    }>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="py-2"
                        key={cell.id}
                        style={{
                          width: `${100 / columns.length}%`,
                        }}>
                        <P className="text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </P>
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
      {pagination && (
        <View className="flex-row items-center justify-end gap-2 rounded-b-md border-t border-t-border bg-background p-3 py-2">
          <View className="flex-row items-center gap-1">
            <Select
              disabled={isPending}
              defaultValue={{ label: '', value: size }}
              onValueChange={(e) => {
                if (e) {
                  setSize(e?.value);
                  router.setParams({ size: e.value, page: '1' });
                }
              }}>
              <SelectTrigger className="native:h-auto h-auto border-none px-0 py-0">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((p) => (
                  <SelectItem
                    key={p}
                    disabled={pagination?.totalItems ? pagination?.totalItems < p : false}
                    label={p.toString()}
                    value={p.toString()}
                  />
                ))}
              </SelectContent>
            </Select>
            <P className="text-sm">Rows per page</P>
          </View>
          <View className="flex-row items-center">
            <Button
              onPress={() => {
                setPage('1');
                router.setParams({ page: '1' });
              }}
              disabled={!searchParams?.page || searchParams?.page == '1' || isPending}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full">
              <ChevronLeft />
            </Button>
            <Button
              onPress={previousPage}
              size="icon"
              disabled={!searchParams?.page || searchParams?.page == '1' || isPending}
              variant="ghost"
              className="h-8 w-8 rounded-full">
              <ChevronsLeft />
            </Button>
            <Button
              onPress={nextPage}
              disabled={
                pagination.currentPage === pagination.totalPage || isPending || pagination.isLast
              }
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full">
              <ChevronsRight />
            </Button>
            <Button
              onPress={() => {
                setPage(pagination.totalPage?.toString());
                router.setParams({ page: pagination.totalPage?.toString() });
              }}
              disabled={pagination.isLast || isPending}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full">
              <ChevronRight />
            </Button>
          </View>
          <P className="text-sm">
            {page || '1'} of {pagination.totalPage || '0'}
          </P>
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

function getColumnWidth(size: number, length: number) {
  const evenWidth = width / length;
  return evenWidth > size ? evenWidth : size;
}
